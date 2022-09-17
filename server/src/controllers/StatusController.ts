import { Controller, Get, Route } from 'tsoa';

/**
 * Just handles status requests
 */
@Route('status')
export class StatusController extends Controller {
  @Get('/')
  public getMessage(): string {
    return 'healthy';
  }
}
