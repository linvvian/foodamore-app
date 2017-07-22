class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params(:name, :email, :password_confirmation))
    user.password = params[:password]
    if user.save
      created_jwt = issue_token({id: user.id})
      render json: { id: user.id, jwt: created_jwt, name: user.name }
    else
      render json: { message: user.errors.full_message, status: 501 }
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  private
  def user_params(*args)
    params.require(:user).permit(args)
  end
end
