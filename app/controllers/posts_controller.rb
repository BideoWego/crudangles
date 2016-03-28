class PostsController < ApplicationController
  before_action :set_post, :except => [:index, :create]

  def index
    @posts = Post.order(:created_at => :desc)
    respond_to do |format|
      format.json { render :json => resource_to_json, :status => 200 }
    end
  end


  def show
    respond_to do |format|
      format.json { render :json => resource_to_json, :status => 200 }
    end
  end


  def create
    @post = Post.new(post_params)
    respond_to do |format|
      if @post.save
        flash.now[:error] = 'Post created'
        format.json { render :json => resource_to_json, :status => 201 }
      else
        flash.now[:error] = 'Post not created'
        format.json { render :json => post_errors, :status => 422 }
      end
    end
  end


  def update
    respond_to do |format|
      if @post.update(post_params)
        flash.now[:error] = 'Post updated'
        format.json { render :json => resource_to_json, :status => 200 }
      else
        flash.now[:error] = 'Post not updated'
        format.json { render :json => post_errors, :status => 422 }
      end
    end
  end


  def destroy
    respond_to do |format|
      if @post.destroy
        flash.now[:error] = 'Post destroyed'
        format.json { render :json => @post, :status => 200 }
      else
        flash.now[:error] = 'Post not destroyed'
        format.json { render :json => post_errors, :status => 422 }
      end
    end
  end


  private
  def set_post
    @post = Post.find_by_id(params[:id])
    unless @post
      flash.now[:error] = 'Could not find post'
      respond_to do |format|
        format.json { render :json => post_errors, :status => 422 }
      end
    end
  end


  def post_params
    params.require(:post).permit(
      :title,
      :author,
      :body
    )
  end


  def post_errors
    if @post
      error = @post.errors.full_messages.to_json
    else
      error = flash.now[:error]
    end
    { :errors => error }
  end


  def resource_to_json
    resource = action_name == 'index' ? @posts : @post
    resource.to_json(:include => :comments)
  end
end


