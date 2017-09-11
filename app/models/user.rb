class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, uniqueness: { case_sensitive: false }
  validates :username, length: 3...33
  validate :username_format_must_be_valid

  has_many :games
  has_many :game_votes
  has_many :annotations

  def self.find_for_database_authentication(conditions)
    if conditions.has_key?(:username)
      username = conditions[:username].downcase
      where("LOWER(username) = ?", username).first
    end
  end

  def error_message_upon_creation
    return unless errors
    error = nil
    if errors.details[:username].present?
      if errors.details[:username].any? {|reason| reason[:error] == :taken }
        error = "Username is taken"
      else
        error = "Username #{errors.messages[:username].first}"
      end
    elsif errors.details[:password].any? {|reason| reason[:error] == :too_short }
      error = "Password must be at least 6 characters"
    elsif errors.details[:password_confirmation].present?
      error = "Passwords don't match"
    end
    error
  end

  def create_access_token!
    Doorkeeper::AccessToken.create!(
      application_id: nil,
      resource_owner_id: id,
      scopes: 'public'
    )
  end

  private

  def email_required?
    false
  end

  def username_format_must_be_valid
    if username !~ /\A[a-z]/i
      errors.add :username, "must start with a letter"
    end
    if username !~ /\A[a-z][a-z0-9_]{2,}\Z/i
      errors.add :username, "must only contain letters, numbers, or underscores"
    end
  end

end
