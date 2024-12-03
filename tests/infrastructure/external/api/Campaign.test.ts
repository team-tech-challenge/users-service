import nock from 'nock';
import axios from 'axios'
import { searchCampaignCustomer } from '../../../../src/infrastructure/external/api/Campaign'; // ajuste o caminho conforme necessário

const API_BASE = process.env.CAMPAIGN_SERVICE_URL || 'http://campaign-service:3001';

describe('searchCampaignCustomer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('deve retornar os dados da campanha para um cliente', async () => {
    const mockId = 1;
    const mockResponse = { data: 'mockData' };

    nock(API_BASE)
      .get(`/campaign/customer/${mockId}`)
      .reply(200, mockResponse);

    const result = await searchCampaignCustomer(mockId);

    expect(result).toEqual(mockResponse);
  });

  it('deve lançar um erro ao falhar a busca da campanha (erro de resposta)', async () => {
    const mockId = 1;
    const mockErrorResponse = { message: 'Not Found' };

    nock(API_BASE)
      .get(`/campaign/customer/${mockId}`)
      .reply(404, mockErrorResponse);

    await expect(searchCampaignCustomer(mockId)).rejects.toThrow('Request failed with status code 404');
  });

  it('deve lançar um erro ao falhar a busca da campanha (erro sem resposta)', async () => {
    const mockId = 1;
    const mockErrorMessage = 'No response received';

    nock(API_BASE)
      .get(`/campaign/customer/${mockId}`)
      .replyWithError({ message: mockErrorMessage });

    await expect(searchCampaignCustomer(mockId)).rejects.toThrow(mockErrorMessage);
  });

  it('deve lançar um erro ao ocorrer um problema de rede', async () => {
    const mockId = 1;
    const mockErrorMessage = 'Network Error';

    nock(API_BASE)
      .get(`/campaign/customer/${mockId}`)
      .replyWithError(mockErrorMessage);

    await expect(searchCampaignCustomer(mockId)).rejects.toThrow(mockErrorMessage);
  });

  it('deve lançar um erro quando error.response não está definido (erro genérico)', async () => {
    const mockId = 1;
    const mockErrorMessage = 'Some other error';

    // Simula um erro sem error.response
    const error = new Error(mockErrorMessage) as any;
    error.response = undefined;

    jest.spyOn(axios, 'get').mockRejectedValueOnce(error);

    try {
      await searchCampaignCustomer(mockId);
    } catch (caughtError) {
      expect(caughtError.message).toBe(mockErrorMessage);
    }
  });
});