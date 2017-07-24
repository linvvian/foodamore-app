class NotificationsController < ApplicationController
  def create
    send_message(params[:to], params[:message])
    render json: { message: "Message Sent" }
  end
  private
  def account_sid
    'ACd545c43b8144c51c1a2e139d5ab00827'
  end

  def auth_token
    '84a49be88138c72740f9f7f4db4b69be'
  end

  def send_message(phone_number, message)
    twilio_number = '+12015286979'
    @client = Twilio::REST::Client.new account_sid, auth_token
    message = @client.messages.create(
      from: twilio_number,
      to: phone_number,
      body: message,
    )
  end
end
