# ----------------------------------------
# Comment Factory
# ----------------------------------------

FactoryGirl.define do
  factory :comment do
    sequence(:body) { |n| "Comment body #{n}" }
    sequence(:author) { |n| "Comment author #{n}" }
  end
end




