import ShortURLService from '../ShortURLService';

jest.mock('shortid', () => ({
  generate: () => 'randomId',
}));

describe('ShortURLService', () => {
  let shortURLService: ShortURLService;
  let shortURLRepository: {
    findOne: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(() => {
    shortURLRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    shortURLService = new ShortURLService(shortURLRepository as any);
  });

  describe('create', () => {
    const redirectURL = 'redirectURL';

    it('should create a short URL', () => {
      shortURLService.create(redirectURL);

      expect(shortURLRepository.save).toHaveBeenCalledWith({
        id: 'randomId',
        url: 'redirectURL',
      });
    });
  });

  describe('findById', () => {
    const shortId = 'shortId';

    it('should return a redirect URL', () => {
      shortURLService.findById(shortId);

      expect(shortURLRepository.findOne).toHaveBeenCalledWith('shortId');
    });
  });

  describe('findByURL', () => {
    const redirectURL = 'redirectURL';

    it('should return a short ID', () => {
      shortURLService.findByURL(redirectURL);

      expect(shortURLRepository.findOne).toHaveBeenCalledWith({
        url: 'redirectURL',
      });
    });
  });
});
