import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPortfolioData } from '../utils/getPortfolioData';
import localData from '../data/portfolio.json';

describe('getPortfolioData', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_GIST_URL;
  });

  it('should return local fallback data when Gist URL is not set', async () => {
    const data = await getPortfolioData();
    expect(data.name).toBe('John Doe');
    expect(data.nickname).toBe('John');
    expect(data).toEqual(localData);
  });

  it('should fetch data from Gist URL when set', async () => {
    const mockGistData = { ...localData, nickname: 'Doe' };
    process.env.NEXT_PUBLIC_GIST_URL = 'https://gist.githubusercontent.com/mock-gist';

    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGistData),
      } as Response),
    );

    const data = await getPortfolioData();
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://gist.githubusercontent.com/mock-gist',
      expect.any(Object),
    );
    expect(data.nickname).toBe('Doe');
    expect(data.name).toBe('John Doe');

    fetchSpy.mockRestore();
  });

  it('should fallback to local data if Gist fetch fails', async () => {
    process.env.NEXT_PUBLIC_GIST_URL = 'https://gist.githubusercontent.com/mock-gist';

    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      } as Response),
    );

    const data = await getPortfolioData();
    expect(data).toEqual(localData);

    fetchSpy.mockRestore();
  });
});
