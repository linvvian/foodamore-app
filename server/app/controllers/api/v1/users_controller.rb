class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params(:name, :email, :password))
    user.password = params[:password]
    if user.save
      render json: { status: 200 }
    else
      render json: { message: user.errors.full_message, status: 501 }
    end
  end

  private
  def user_params(*args)
    params.require(:user).permit(args)
  end
end
