# 🚀 Comece Aqui - Guia de Documentação

> **Para não-técnicos**: Este guia explica onde encontrar informações sobre o protótipo de forma simples e direta.

## 📖 Qual documento ler?

### 1️⃣ Preciso rodar o protótipo
**Leia**: `README.md` → Seção "Setup"

**O que tem**:
- Como instalar
- Como rodar o servidor local
- Link para acessar (http://localhost:5173)

**Comandos que você vai usar**:
```bash
npm install        # Instalar (só precisa fazer 1 vez)
npm run dev        # Rodar o protótipo
```

---

### 2️⃣ Quero entender o que o protótipo faz
**Leia**: `README.md` → Seção "Features"

**O que tem**:
- Lista de todas as funcionalidades
- O que cada tela faz
- Como o fluxo de migração funciona

---

### 3️⃣ Quero ver como o wizard funciona passo a passo
**Leia**: `MIGRATION_WIZARD.md` → Seção "Step-by-Step Breakdown"

**O que tem**:
- Descrição detalhada de cada tela
- Screenshots conceituais
- O que acontece quando você clica em cada botão
- Onde estão as informações salvas

**Exemplo**: Se você quer saber "o que acontece quando clico em Save and Exit?", essa seção explica tudo.

---

### 4️⃣ Quero testar o protótipo para apresentar
**Leia**: `MIGRATION_WIZARD.md` → Seção "Testing the Prototype"

**O que tem**:
- Cenários para testar passo a passo
- "Happy path" (fluxo ideal sem problemas)
- Cenários de "Save and Resume"
- O que esperar ver em cada etapa

**Use isso antes de demos com stakeholders!**

---

### 5️⃣ Algo não está funcionando
**Leia**: `MIGRATION_WIZARD.md` → Seção "Troubleshooting"

**O que tem**:
- Problemas comuns e soluções
- Como limpar o progresso salvo
- O que fazer se o modal não abrir
- Como resetar o protótipo

**Solução rápida para resetar tudo**:
1. Abra o navegador
2. Pressione F12 (DevTools)
3. Vá em "Application" → "Local Storage"
4. Delete a chave `migrationProgress`
5. Recarregue a página

---

### 6️⃣ Quero mudar textos ou imagens
**Leia**: `README.md` → Seção "Customization Guide"

**O que tem**:
- Como mudar textos do banner
- Como trocar ilustrações
- Como ajustar o tempo das animações
- Onde estão as imagens

**Exemplos**:
- Mudar "Complete by June 1st" → `MigrationBanner.tsx` linha 165
- Trocar ilustração → Substitua `public/wizard-illustration.png`
- Mudar tempo da animação → `MigrationWizard.tsx` linha 777

---

### 7️⃣ Quero entender a estrutura dos arquivos
**Leia**: `PROJECT_STRUCTURE.md`

**O que tem**:
- Mapa visual de todos os arquivos
- O que cada arquivo faz
- Onde encontrar cada funcionalidade

**Útil quando**: Você precisa encontrar onde está algo específico

---

### 8️⃣ Quero ver o histórico de mudanças
**Leia**: `CHANGELOG.md`

**O que tem**:
- Tudo que foi feito na versão 1.0
- Próximas melhorias planejadas
- Data de cada versão

---

### 9️⃣ Quero entender o fluxo completo do usuário
**Leia**: `MIGRATION_WIZARD.md` → Seção "User Flows"

**O que tem**:
- Fluxo do usuário primeira vez
- Fluxo quando volta depois de salvar
- Diagramas de decisão

**Exemplo visual**:
```
Usuário clica "Get started"
    ↓
Tela de introdução
    ↓
Clica "Start assisted migration"
    ↓
Passo 1: Seleciona canais
    ↓
Passo 2: Revisa configurações
    ↓
Passo 3: Configura AI agent
    ↓
Passo 4: Assiste migração
    ↓
Tela de sucesso ✓
```

---

## 🎯 Cenários Comuns

### "Vou apresentar para stakeholders amanhã"
1. Leia `MIGRATION_WIZARD.md` → "Testing the Prototype"
2. Teste todos os cenários listados
3. Anote qualquer problema
4. Se precisar resetar: delete `migrationProgress` do localStorage

### "Preciso mudar o prazo de June 1st para August 15th"
1. Abra `src/components/MigrationBanner.tsx`
2. Procure linha 165: `<span>Complete by June 1st</span>`
3. Mude para: `<span>Complete by August 15th</span>`
4. Salve o arquivo
5. Recarregue a página no navegador

### "Quero trocar a ilustração do wizard"
1. Vá para a pasta `public/`
2. Substitua o arquivo `wizard-illustration.png` pela nova imagem
3. Mantenha o mesmo nome do arquivo
4. Recarregue a página no navegador

### "Preciso adicionar mais canais na lista"
1. Leia `README.md` → "Customization Guide" → "Modifying Channel Data"
2. Siga o exemplo de código
3. Ou peça ajuda técnica para adicionar

### "O botão está travado em 'Continue migration'"
1. Abra DevTools (F12)
2. Application → Local Storage → `migrationProgress`
3. Delete a chave
4. Recarregue a página
5. Deve voltar para "Get started"

---

## 📱 Como Abrir os Documentos

### No Mac:
1. Abra o Finder
2. Navegue até: `/Users/gabrielconcentino/Documents/ClaudeCode/Prototype test/admin-center-home-prototype/`
3. Clique duas vezes no arquivo `.md` que quer ler
4. Abre automaticamente no visualizador de Markdown

### Ou use um editor de texto:
- **VS Code** (recomendado): Tem preview do Markdown
- **TextEdit**: Abre como texto simples
- **Typora** ou **MacDown**: Editores de Markdown com preview bonito

---

## 🆘 Ajuda Rápida

### Comando para rodar o protótipo:
```bash
cd "/Users/gabrielconcentino/Documents/ClaudeCode/Prototype test/admin-center-home-prototype"
npm run dev
```

### Link do protótipo rodando:
http://localhost:5173

### Como parar o servidor:
Pressione `Ctrl + C` no terminal

### Como resetar tudo:
1. Feche o servidor (Ctrl + C)
2. Delete a pasta `node_modules`
3. Rode `npm install`
4. Rode `npm run dev`

---

## 📊 Mapa Visual da Documentação

```
START_HERE.md (você está aqui!)
    ↓
README.md ..................... Visão geral + Como usar
    ↓
MIGRATION_WIZARD.md ........... Detalhes do wizard
    ↓
PROJECT_STRUCTURE.md .......... Onde está cada coisa
    ↓
CHANGELOG.md .................. O que mudou
```

---

## 🎓 Glossário Simplificado

| Termo Técnico | O que significa |
|---------------|-----------------|
| **localStorage** | Lugar onde o navegador salva dados localmente (progresso do wizard) |
| **Modal** | Janela popup que aparece sobre a página |
| **State** | Informações que o sistema guarda enquanto você usa |
| **Component** | Pedaço reutilizável da interface (botão, tabela, etc) |
| **Props** | Informações passadas de um componente para outro |
| **Animation** | Movimento/transição visual (ex: as bolinhas girando) |
| **Step** | Etapa do wizard (1, 2, 3, 4) |
| **Save and Exit** | Botão que salva progresso e fecha o wizard |
| **Resume** | Continuar de onde parou |

---

## 💡 Dicas Importantes

1. **Sempre rode `npm run dev` antes de testar** - O protótipo precisa estar rodando
2. **Use Chrome ou Firefox** - Melhor compatibilidade
3. **Abra DevTools (F12) se algo der errado** - Console mostra erros
4. **Salve antes de testar mudanças** - Recarregue a página depois
5. **Teste em modo anônimo** - Garante que está limpo sem cache

---

## 🔗 Links Rápidos

- **Figma Design**: https://www.figma.com/design/tNNPSKPlx5jrEZtWHludvd/Migration-Essentials-%3E-AIAA
- **Zendesk Garden**: https://garden.zendesk.com (componentes usados)
- **Pasta do Projeto**: `/Users/gabrielconcentino/Documents/ClaudeCode/Prototype test/admin-center-home-prototype/`

---

## 📞 Próximos Passos

1. **Leia o README.md primeiro** - Entenda o básico
2. **Rode o protótipo** - Veja funcionando
3. **Teste os cenários** - Use o guia de testing
4. **Se precisar mudar algo** - Consulte o guia de customização
5. **Se algo quebrar** - Veja o troubleshooting

---

**Última atualização**: 2026-04-17  
**Versão do protótipo**: 1.0.0
