import { CarNamePipe } from './car-name.pipe';

describe('CarNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CarNamePipe();
    expect(pipe).toBeTruthy();
  });
});
