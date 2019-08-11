class IdeasChannel < ApplicationCable::Channel
  def subscribed
    @idea = Idea.find(params[:id])
    stream_for @idea
  end

  def received(data)
    IdeasChannel.broadcast_to(@idea, idea: @idea)
  end

  def unsubscribed
    stop_all_streams
  end
end
