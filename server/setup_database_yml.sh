cat <<EOF > config/database.yml
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: <%= ENV["DB_USERNAME"] %>
  password: <%= ENV["DB_PASSWORD"] %>
  host: <%= ENV["DB_HOST"] %>
  port: <%= ENV.fetch("DB_PORT", 3306) %>

development:
  <<: *default
  database: <%= ENV["DB_DATABASE"] %>

test:
  <<: *default
  database: <%= ENV["DB_DATABASE"] %>

production:
  <<: *default
  database: <%= ENV["DB_DATABASE"] %>
  username: <%= ENV["DB_USERNAME"] %>
  password: <%= ENV["DB_PASSWORD"] %>
  host: <%= ENV["DB_HOST"] %>
  port: <%= ENV.fetch("DB_PORT", 3306) %>
EOF
