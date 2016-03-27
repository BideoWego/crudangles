class Post < ActiveRecord::Base
  has_many :comments, :dependent => :destroy

  default_scope { includes(:comments) }

  validates :title,
            :presence => true

  validates :author,
            :presence => true

  validates :body,
            :presence => true
end
