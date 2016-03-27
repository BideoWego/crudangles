# ----------------------------------------
# Post Factory
# ----------------------------------------

FactoryGirl.define do
  factory :post do
    sequence(:title) { |n| "Post title #{n}" }
    sequence(:body) { |n| "Post body #{n}" }
    sequence(:author) { |n| "Post author #{n}" }
  end
end




