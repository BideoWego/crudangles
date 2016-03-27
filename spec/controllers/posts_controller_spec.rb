require 'rails_helper'

describe PostsController do
  let(:article) { create(:post) }
  let(:comment) { create(:comment, :post => article) }
  let(:json) { JSON.parse(response.body) }


  before do
    article
    comment
  end


  # ----------------------------------------
  # GET #index
  # ----------------------------------------

  describe 'GET #index' do

    it 'returns all posts' do
      get :index, :format => :json
      expect(json).to_not be_empty
    end
  end


  # ----------------------------------------
  # GET #show
  # ----------------------------------------

  describe 'GET #show' do
    
    context 'id is valid' do

      it 'returns the post with the given id' do
        get :show, :id => article.id, :format => :json
        expect(json['id']).to eq(article.id)
      end
    end


    context 'id is invalid' do

      it 'returns an object with an errors key' do
        get :show, :id => 0, :format => :json
        expect(json['errors']).to_not be_nil
      end
    end
  end


  # ----------------------------------------
  # POST #create
  # ----------------------------------------

  describe 'POST #create' do
    let(:post_create_valid) do
      post :create, :format => :json, :post => attributes_for(:post)
    end
    let(:post_create_invalid) do
      post :create, :format => :json, :post => { :title => 'Oops!' }
    end

    context 'data is valid' do

      it 'creates the post' do
        expect { post_create_valid }.to change(Post, :count).by(1)
      end

      it 'returns the post' do
        post_create_valid
        expect(json['title']).to_not be_nil
      end
    end


    context 'data is invalid' do

      it 'does not create the post' do
        expect { post_create_invalid }.to change(Post, :count).by(0)
      end

      it 'returns the post errors' do
        post_create_invalid
        expect(json['errors']).to_not be_nil
      end
    end
  end
end









