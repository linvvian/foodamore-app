class Api::V1::AuthController < ApplicationController
  before_action :authorize_user!, only: [:show]

  def show
    render json: { id: current_user.id, message: 'Token is valid' }
  end

  def create
    user = User.find_by(email: params[:email])
    if user.present? && user.authenticate(params[:password])
      created_jwt = issue_token({id: user.id})
      render json: {id: user.id, name: user.name, jwt: created_jwt}
    else
      render json: {
        error: 'Username or password incorrect'
      }, status: 404
    end
  end
end
