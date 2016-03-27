class CommentsController < ApplicationController
  before_action :set_comment, :except => [:index, :create]


  def create
    @comment = Comment.new(comment_params)
    respond_to do |format|
      if @comment.save
        flash.now[:error] = 'Comment created'
        format.json { render :json => @comment, :status => 201 }
      else
        flash.now[:error] = 'Comment not created'
        format.json { render :json => comment_errors, :status => 422 }
      end
    end
  end


  def update
    respond_to do |format|
      if @comment.update(comment_params)
        flash.now[:error] = 'Comment updated'
        format.json { render :json => @comment, :status => 200 }
      else
        flash.now[:error] = 'Comment not updated'
        format.json { render :json => comment_errors, :status => 422 }
      end
    end
  end


  def destroy
    respond_to do |format|
      if @comment.destroy
        flash.now[:error] = 'Comment destroyed'
        format.json { render :josn => @comment, :status => 200 }
      else
        flash.now[:error] = 'Comment not destroyed'
        format.json { render :json => comment_errors, :status => 422 }
      end
    end
  end


  private
  def set_comment
    @comment = Comment.find_by_id(params[:id])
    unless @comment
      flash.now[:error] = 'Could not find comment'
      respond_to do |format|
        format.json { render :json => @comment, :stats => 422 }
      end
    end
  end


  def comment_params
    params.require(:comment).permit(
      :body,
      :author,
      :post_id
    )
  end


  def comment_errors
    { :errors => @comment.errors.full_messages.to_json }
  end
end


