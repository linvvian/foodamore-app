class Api::V1::TagsController < ApplicationController
  def index
    render json: Tag.all
  end
end
