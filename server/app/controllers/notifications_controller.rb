class NotificationsController < ApplicationController
  def create
    send_message(params[:to], params[:message])
    render json: { message: "Message Sent" }
  end
  private
  def send_message(phone_number, message)
    twilio_number = '+12015286979'
    @client = Twilio::REST::Client.new twilio_sid, twilio_api_token
    message = @client.messages.create(
      from: twilio_number,
      to: phone_number,
      body: message,
    )
  end
end
