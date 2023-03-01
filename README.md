
![Cover image](https://raw.githubusercontent.com/Schrodinger-Hat/youtube-to-anchorfm/main/assets/img/cover.png 
'Cover image')
# YouTube to Anchor.fm Bot
O bot YouTube to Anchor.fm converte vídeos do YouTube em episódios de podcasts no Anchor.fm. Ele usa a API do YouTube para extrair o áudio do vídeo e o envia para o Anchor.fm como um novo episódio do podcast.

O código faz o download do vídeo do YouTube, extrai o áudio do vídeo e, em seguida, faz upload do áudio para o Anchor.fm. O bot também permite definir o título e a descrição do episódio do podcast e incluir um link para o vídeo original do YouTube como referência.

Para usar o bot, você precisa configurar suas credenciais do YouTube e do Anchor.fm no arquivo .env. Você também pode definir outras configurações, como o formato de saída do áudio e as configurações de publicação do episódio no Anchor.fm.

O bot é executado a partir do arquivo main.py. Quando executado, ele solicita que você insira o ID do vídeo do YouTube que deseja converter em um episódio de podcast no Anchor.fm. Depois que o processo de conversão é concluído, o bot exibe o URL do novo episódio do podcast no Anchor.fm.

## Requisitos
Para executar o bot, é necessário ter as seguintes ferramentas instaladas:

- [Python 3](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installing/)
- [ffmpeg](https://ffmpeg.org/download.html) (veja abaixo para instruções de instalação)

## Instalação

1. Clone o repositório em sua máquina:

```bash
git clone https://github.com/paulokbk/youtube-to-anchor-bot.git
```

2. Instale as dependências do bot:

```bash
cd youtube-to-anchor-bot
pip install -r requirements.txt

```

3. Configure suas credenciais do YouTube e do Anchor.fm no arquivo .env. O arquivo .env.example é fornecido como modelo.

4. Instale o ffmpeg de acordo com seu sistema operacional. As instruções podem ser encontradas na seção "Instalação do ffmpeg" abaixo.

## Uso

Execute o bot a partir do arquivo main.py:

```css
python main.py
```

O bot solicitará o ID do vídeo do YouTube que você deseja converter em um episódio do seu podcast no Anchor.fm. Depois que o processo de conversão for concluído, o bot exibirá o URL do novo episódio no Anchor.fm.

## Instalação do ffmpeg:

### Windows

1. Acesse o site oficial do ffmpeg: (https://ffmpeg.org/download.html#build-windows.)
2. Baixe a versão mais recente do ffmpeg para Windows.
3. Descompacte o arquivo baixado em uma pasta de sua escolha.
4. Adicione o diretório bin do ffmpeg ao caminho do sistema.
5. Abra o terminal ou prompt de comando e execute o comando ffmpeg para confirmar que a instalação foi concluída com sucesso.

### Linux

1. Abra o terminal e execute o seguinte comando:

```
sudo apt-get install ffmpeg
```

2. Aguarde até que o processo de instalação seja concluído.
3. Para confirmar que a instalação foi concluída com sucesso, execute o comando ffmpeg no terminal.

### macOS

1. Abra o terminal e execute o seguinte comando usando o Homebrew:

```
brew install ffmpeg
```

2. Aguarde até que o processo de instalação seja concluído.
3. Para confirmar que a instalação foi concluída com sucesso, execute o comando ffmpeg no terminal.

## Créditos:

### [Schrödinger Hat](https://github.com/Schrodinger-Hat)
  - [https://github.com/Schrodinger-Hat](https://github.com/Schrodinger-Hat/youtube-to-anchorfm)
