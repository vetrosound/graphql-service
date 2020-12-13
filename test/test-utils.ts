import { Response } from 'supertest';

export function assertStatusClosure(status: number): (res: Response) => any {
  return (res: Response): any => {
    if (res.status !== status) {
      console.log(
        `Response message: ${JSON.stringify(JSON.parse(res.text), null, 2)}`,
      );
      throw new Error(`Expected status to be ${status} but was ${res.status}`);
    }
  };
}
