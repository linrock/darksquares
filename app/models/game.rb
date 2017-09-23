class Game < ApplicationRecord
  acts_as_paranoid

  before_validation :format_pgn_headers
  before_validation :calculate_moves_and_positions
  before_validation :classify_opening

  validates_presence_of :pgn
  validates_presence_of :pgn_headers
  validates_presence_of :moves
  validates_presence_of :positions
  validates_length_of :name, in: (1..64), allow_nil: true
  validates_length_of :moves, in: (1...256)
  validate :metadata_must_be_valid
  validate :pgn_headers_must_be_valid

  belongs_to :user
  has_many :annotations
  has_many :votes, class_name: 'GameVote'

  delegate :status, :percent_analyzed, to: :analysis_status

  METADATA_KEYS = %w( perspective )

  def calculate_moves_and_positions
    return if pgn_headers.present? && moves.present? && positions.present?
    self.pgn_headers = pgn_loader.pgn_headers
    self.moves = pgn_loader.moves
    self.positions = pgn_loader.positions
  end

  def calculate_game_data!
    self.analysis = GameAnalyzer.new(self.positions).analyze!
    self.best_moves = self.analysis.map {|position| position.dig("bestmove", "san") }
    self.graph_points = GraphPointsCalculator.new(self.analysis).calculate!.values[0].values
    self.save!
  end

  def classify_opening
    return if self.pgn_headers["ECO"] || self.pgn_headers["Opening"]
    opening = $opening_tree.get_opening_from_pgn_movetext pgn_movetext
    self.pgn_headers["ECO"] = opening.base_eco
    self.pgn_headers["Opening"] = opening.name
  end

  def async_calculate_game_data
    GameDataCalculator.perform_later self
  end

  def position_index_from_move_string(move_string)
    move_string[/^\d+/, 0].to_i * 2 - (move_string.include?('...') ? 0 : 1)
  end

  def pgn_movetext
    pgn.gsub(/.*\]/, '').strip
  end

  def perspective=(perspective)
    self.metadata["perspective"] = perspective
  end

  def as_json(options = {})
    super(options).merge({
      user: {
        username: user.username,
      }
    })
  end

  private

  def metadata_must_be_valid
    perspective = self.metadata["perspective"]
    metadata.keys.each {|key|
      if !METADATA_KEYS.include? key
        errors.add(:metadata, "invalid metadata key - #{key}")
      end
    }
    if perspective.present?
      unless %w( white black ).include? perspective
        errors.add(:metadata, "perspective is invalid - #{perspective}")
      end
    end
  end

  def pgn_headers_must_be_valid
    return unless self.pgn_headers.present?
    if self.pgn_headers.keys.any? {|header| header =~ /\s/ }
      errors.add(:pgn_headers, "can't have spaces in the header key")
    end
    if self.pgn_headers.keys.any? {|header| header.length > 32 }
      errors.add(:pgn_headers, "can't have header keys longer than 32 characters")
    end
    if self.pgn_headers.values.any? {|header| header.length > 128 }
      errors.add(:pgn_headers, "can't have header values longer than 128 characters")
    end
  end

  def format_pgn_headers
    return unless self.pgn_headers.present?
    new_pgn_headers = {}
    self.pgn_headers.each do |header, value|
      new_header = header.dup.strip
      new_header[0] = new_header[0].upcase
      new_pgn_headers[new_header] = value.strip
    end
    self.pgn_headers = new_pgn_headers
  end

  def pgn_loader
    @pgn_loader ||= PgnLoader.new(pgn)
  end

  def analysis_status
    @analysis_status ||= GameAnalysisStatus.new(self)
  end

end
