

# Melhorias no carregamento de videos com imagem de capa

## O que ja funciona
O componente atual ja mostra a foto do avaliador como capa e so carrega o video ao clicar. Porem, ha um problema de UX: ao clicar em play, a imagem de capa desaparece imediatamente (porque `playing` vira `true`), mas o video ainda nao esta pronto -- causando um flash de tela preta ate o video comecar.

## Melhorias propostas

### 1. Manter imagem de capa ate o video estar pronto
- Adicionar estado `videoReady` controlado pelo evento `canplay` do video
- Manter a imagem de capa visivel ate `videoReady === true` (em vez de esconder quando `playing === true`)
- Isso elimina o flash de tela preta

### 2. Indicador de carregamento (spinner)
- Mostrar um spinner animado entre o clique e o inicio da reproducao
- Visivel quando `videoLoaded && !videoReady` (video foi solicitado mas ainda nao esta pronto)

### 3. Preload otimizado
- Mudar `preload="auto"` para `preload="none"` ja que o video so e montado sob demanda -- nao precisa de preload

## Detalhes tecnicos

Arquivo: `src/components/ReviewsSection.tsx`

- Novo estado: `videoReady` (boolean, default false)
- Event handler: `onCanPlay` no elemento `<video>` para setar `videoReady = true`
- Condicao da imagem de capa: `{!videoReady && <img ... />}` (antes era `{!playing && ...}`)
- Spinner: renderizado quando `videoLoaded && !videoReady`
- Video preload: alterado para `"none"`

