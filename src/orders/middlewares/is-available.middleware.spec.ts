import { IsAvailableMiddleware } from './is-available.middleware';

describe('IsAvailableMiddleware', () => {
  it('should be defined', () => {
    expect(new IsAvailableMiddleware()).toBeDefined();
  });

  // should return false if the product is not available
  // should return true if the product is available
  it('should return false if the product is not available', () => {
    const middleware = new IsAvailableMiddleware();
    const req = {
      body: {
        product: {
          available: false,
        },
      },
    };
    const res = {};
    const next = jest.fn();
    middleware.use(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
