class Comment < ActiveRecord::Base
  belongs_to :post

  validates :body,
            :presence => true

  validates :author,
            :presence => true

  validates :post,
            :presence => true
end
