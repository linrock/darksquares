class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :games
  has_many :annotations

  def self.find_for_database_authentication(conditions)
    if conditions.has_key?(:username)
      username = conditions[:username].downcase
      where("LOWER(username) = ?", username).first
    end
  end

  private

  def email_required?
    false
  end
end
