<template>
  <div class="avatar-content">
    <button>
      <div class="user-account-wrapper">
        <span class="account"> jose.pereira@axians.com</span>
        <span class="company">Axians Digital Solutions, S.A</span>
      </div>
      <div >
        <img class="user-picture" src="../assets/pictures/default-avatar-profile.jpg"/>
      </div>
    </button>
    <div class="account-dropdown-menu" id="accountDropdownMenu">
      <div class="user-info-detail">
        <p><strong>jose.pereira@axians.com</strong></p>
        <p class="email">utilizador@empresa.com</p>
      </div>
      <ul class="account-actions">
        <li><a href="#">Perfil</a></li>
        <li><a href="#">Definições</a></li>
        <li class="separator"></li>
        <li><a href="#" class="logout">Sair</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.avatar-content {
  display:inline-flex;
}

.avatar-content button {
  font-family: inherit; 
  display:inline-flex;
  color: white;
  background-color: transparent;
  padding: 0;
  border: none;
}

.user-account-wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  
  padding: 0 12px;
}
.user-account-wrapper .account {
  font-size: 1.3rem;
}
.user-account-wrapper .company {
  font-size: 1rem;
  text-transform:uppercase;
  font-weight: 600;
}
.user-picture {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: block;
  margin: auto;
  
}
/* Estilo do botão de ativação (o que o utilizador clica) */
.account-toggle-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
}
.account-toggle-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* ----------------------------------------------------------- */
/* 3. O DROP-DOWN MENU                                       */
/* ----------------------------------------------------------- */

.account-dropdown-menu {
    /* 🔑 POSICIONAMENTO: Sobrepõe o conteúdo */
    position: absolute;
    top: 100%; /* Posiciona-se logo abaixo da top-bar/botão */
    right: 0;  /* Alinha-se à direita do wrapper */
    
width: 280px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    color: var(--text-color);
    z-index: 100;
    
    /* 🔑 ESSENCIAL 1: Adiciona a Perspetiva 3D ao elemento */
    perspective: 1000px; 
    
    /* 🔑 ESSENCIAL 2: Garante que o menu é fixo no topo */
    transform-origin: top center; 
    
    /* Estado Inicial: Gira quase a 90 graus. */
    /* Usamos 'scaleY' ligeiramente para compensar a distorção 3D ao fechar */
    transform: rotateX(-95deg) scaleY(0.9); 
    
    /* 🔑 ESSENCIAL 3: Esconde a parte de trás do elemento durante a rotação (limpeza visual) */
    backface-visibility: hidden;

    opacity: 0;
    visibility: hidden;
    
    /* 🔑 ANIMAÇÃO: Suaviza a rotação e a visibilidade */
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), /* Função de curva que simula a queda */
                opacity 0.2s 0.2s ease-in, 
                visibility 0s 0.4s; /* Oculta visivelmente após a transição */
}

/* Estilos internos */
.user-info-detail {
    padding: 15px;
    border-bottom: 1px solid #eee;
    background-color: var(--light-gray);
}
.account-actions {
    list-style: none;
    padding: 5px 0;
    margin: 0;
}
.account-actions li a {
    display: block;
    padding: 8px 15px;
    text-decoration: none;
    color: var(--text-color);
}
.account-actions li a:hover {
    background-color: #f0f0f0;
}
.account-actions .separator {
    border-top: 1px solid #eee;
    margin: 5px 0;
}
.account-actions .logout {
    color: darkred;
}

/* ----------------------------------------------------------- */
/* 4. ESTADO ATIVO (VISÍVEL)                                 */
/* ----------------------------------------------------------- */

/* Quando a classe 'active' está no wrapper, mostra o menu */
.user-account-wrapper.active .account-dropdown-menu {
transform: rotateX(0deg) scaleY(1); 
    
    opacity: 1;
    visibility: visible;
    
    /* Reseta o delay para aparecer instantaneamente (para o efeito visual) */
    transition-delay: 0s;
}
</style>