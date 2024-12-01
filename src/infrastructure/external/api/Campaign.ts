import { config } from 'dotenv';
import axios from 'axios';

config();

const API_BASE = process.env.CAMPAIGN_SERVICE_URL || 'http://campaign-service:3001';

// Função para buscar informações de pagamento de campaign
const searchCampaignCustomer = async (id: number) => {

    const headers = {        
        'Content-Type': 'application/json',        
    };


    try {
        const response = await axios.get(
            `${API_BASE}/campaign/customer/${id}`,
            {
                headers                
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error searching Campaign in order:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export { searchCampaignCustomer };