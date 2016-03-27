# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# ----------------------------------------
# Clean Database
# ----------------------------------------
if Rails.env == 'development'
  puts "Cleaning database"
  puts
  Rake::Task['db:migrate:reset'].invoke
end

# ----------------------------------------
# Config
# ----------------------------------------
MULTIPLIER = 1

AUTHORS = [
  'Darth Vader',
  'Luke Skywalker',
  'Princess Leia',
  'Jabba the Hutt'
]

BUZZ_WORDS = [
  'jedi',
  'sith lord',
  'force',
  'wookie',
  'light saber',
  'empire',
  'death star'
]

VERBS = [
  'overcomes',
  'defeated by',
  'falls in love with',
  'runs away from',
  'forgets to call back'
]

ADJECTIVES = [
  'shiny',
  'flirtaious',
  'homeless',
  'itchy',
  'troubled',
  'lonely'
]

TEXT_BODIES = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cumque eveniet accusantium aperiam nihil eligendi, voluptatibus vero nostrum reprehenderit molestiae? Perferendis magnam voluptates itaque adipisci, possimus, tenetur dignissimos vel unde.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum aliquam nihil rem voluptatum fugit corrupti ut velit, debitis excepturi quam eius soluta nulla, accusamus, eaque at impedit qui earum! Numquam.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis temporibus doloremque repellat cumque minus ullam laborum quia magni, asperiores eius, ea, ducimus atque laboriosam. Rem repellat sint reiciendis iste! Delectus!'
]



# ----------------------------------------
# Create Posts
# ----------------------------------------
puts 'Creating Posts'

posts = []
(MULTIPLIER * 30).times do
  posts << {
    :title => "#{BUZZ_WORDS.sample} #{VERBS.sample} #{ADJECTIVES.sample} #{BUZZ_WORDS.sample}".titleize,
    :author => AUTHORS.sample,
    :body => TEXT_BODIES.sample
  }
end
Post.create(posts)
posts = Post.all



# ----------------------------------------
# Create Comments
# ----------------------------------------
puts 'Creating Comments'

comments = []
(MULTIPLIER * 3 * posts.length).times do
  comments << {
    :author => AUTHORS.sample,
    :body => TEXT_BODIES.sample,
    :post_id => posts.sample.id
  }
end
Comment.create(comments)
comments = Comment.all



# ----------------------------------------
# Finish
# ----------------------------------------
puts 'Done'



























