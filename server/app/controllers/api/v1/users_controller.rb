class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params(:name, :email, :password_confirmation))
    user.password = params[:password]
    if user.save
      created_jwt = issue_token({id: user.id})
      render json: { id: user.id, jwt: created_jwt, name: user.name }
    else
      render json: { message: user.errors.full_message }
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    user = User.find(params[:id])
    if user.authenticate(params[:user][:old_password])

      if user.update(user_params(:name, :email, :password))
        render json: user
      else
        render json: { message: user.errors.full_message }
      end
      
    else
      render json: { status: 401, message: user.errors.full_message }
    end
  end

  private
  def user_params(*args)
    params.require(:user).permit(args)
  end
end
