class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_uniqueness_of :username, case_sensitive: false

  has_many :games
  has_many :annotations

  def self.find_for_database_authentication(conditions)
    if conditions.has_key?(:username)
      username = conditions[:username].downcase
      where("LOWER(username) = ?", username).first
    end
  end

  def error_message_upon_creation
    return unless errors
    if errors.details[:username].present?
      return "Invalid username"
    elsif errors.details.dig(:password, 0, :error) == :too_short
      return "Password must be at least 6 characters"
    elsif errors.details[:password_confirmation]
      return "Passwords don't match"
    end
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
