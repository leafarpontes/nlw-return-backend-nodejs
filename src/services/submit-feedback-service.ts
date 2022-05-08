import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
  type: string,
  comment: string,
  screenshot?: string
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
    ) {
  }

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type: type,
      comment: comment,
      screenshot: screenshot
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}