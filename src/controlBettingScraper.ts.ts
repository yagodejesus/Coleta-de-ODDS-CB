import puppeteer from 'puppeteer';

// Função para coletar odds de fechamento de jogos
async function coletarOddsDeFechamento(url: string): Promise<void> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Aguarda e seleciona os dados das odds de fechamento
        const oddsDeFechamento = await page.evaluate(() => {
            const dados: { jogo: string, odds: string }[] = [];

            // Ajustar esse seletor pra capturar as odds de fechamento.
            document.querySelectorAll('.game-row').forEach(game => {
                const teams = game.querySelector('.game-teams')?.textContent?.trim();
                const closeOdds = game.querySelector('.close-odds')?.textContent?.trim();

                if (teams && closeOdds) {
                    dados.push({ jogo: teams, odds: closeOdds });
                }
            });

            return dados;
        });

        console.log('Odds de fechamento coletadas:', oddsDeFechamento);
    } catch (error) {
        console.error('Erro ao coletar odds de fechamento:', error);
    } finally {
        await browser.close();
    }
}

// URL controlbetin eu realmente n sei se é um site?????, se for a task tá no começo hahahaha
const controlBettingUrl = ''; 

// Executar!!!!!!
async function main() {
    console.log(`Coletando odds de fechamento de: ${controlBettingUrl}`);
    await coletarOddsDeFechamento(controlBettingUrl);
}

main();
