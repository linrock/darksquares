class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_uniqueness_of :username, case_sensitive: false

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
        error "Invalid username"
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
end
