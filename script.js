// Inicialização GSAP
document.addEventListener("DOMContentLoaded", () => {
  gsap.to(".header-anim", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });
  gsap.to(".section-anim", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".section-anim",
      start: "top 80%",
    },
  });
  updateProgress();
});

// Sortable JS Setup
const sortableList = document.getElementById("sortable-list");
const sortable = new Sortable(sortableList, {
  animation: 150,
  ghostClass: "sortable-ghost",
});

// Lógica de Seleção de Seções
document.querySelectorAll(".secao-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const val = e.target.value;
    if (e.target.checked) {
      const div = document.createElement("div");
      div.className = "draggable-item shadow-sm";
      div.setAttribute("data-id", val);
      div.innerHTML = `
                <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path></svg>
                ${val}
            `;
      sortableList.appendChild(div);
    } else {
      const item = sortableList.querySelector(`[data-id="${val}"]`);
      if (item) item.remove();
    }
  });
});

// Adicionar Referência Dinâmica
function addReferencia() {
  const container = document.getElementById("referencias-container");
  const input = document.createElement("input");
  input.type = "url";
  input.name = "referencias[]";
  input.placeholder = "https://exemplo.com";
  input.className = "w-full p-3 bg-gray-50 border rounded-xl mt-2 section-anim";
  container.appendChild(input);
  gsap.from(input, { opacity: 0, x: -10, duration: 0.3 });
}

// Barra de Progresso
function updateProgress() {
  const form = document.getElementById("briefingForm");
  const required = form.querySelectorAll("[required]");
  const inputs = form.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      let filled = 0;
      required.forEach((req) => {
        if (req.value.trim() !== "") filled++;
      });
      const percent = (filled / required.length) * 100;
      document.getElementById("progress-fill").style.width = percent + "%";
    });
  });
}

function sendToWhatsApp() {
  const form = document.getElementById("briefingForm");
  const formData = new FormData(form);

  const meuNumero = "5583987325752";
  let mensagem = "🚀 *NOVO PLANEJAMENTO DE SITE*\n\n";

  // Objetivos
  const objetivos = formData.getAll("objetivo[]");
  if (objetivos.length) mensagem += `🎯 *Objetivos:* ${objetivos.join(", ")}\n`;

  mensagem += `🎯 *Ação Principal:* ${formData.get("acao_principal")}\n\n`;

  // Público
  mensagem += `👥 *Público:* ${formData.get("cliente_ideal")}\n`;
  mensagem += `🎂 *Idade:* ${formData.get("idade")}\n`;
  mensagem += `💎 *Padrão:* ${formData.get("classe_social")}\n\n`;

  // Negócio
  mensagem += `🏢 *Empresa:* ${formData.get("empresa_nome")}\n`;
  mensagem += `💡 *Diferencial:* ${formData.get("diferencial")}\n\n`;

  // Estilo
  mensagem += `🎨 *Estilo:* ${formData.get("estilo") || "Não definido"}\n`;
  mensagem += `🎨 *Cores:* ${formData.get("cores")}\n\n`;

  // Estrutura Ordenada
  const itensOrdenados = Array.from(sortableList.children).map((item) =>
    item.innerText.trim(),
  );
  if (itensOrdenados.length) {
    mensagem += `🏗️ *Estrutura Desejada (Ordem):*\n`;
    itensOrdenados.forEach(
      (item, index) => (mensagem += `${index + 1}. ${item}\n`),
    );
    mensagem += `\n`;
  }

  mensagem += `📞 *Contato:* ${formData.get("cli_whatsapp")}\n`;
  mensagem += `📧 *E-mail:* ${formData.get("_replyto")}`;

  const encodedMessage = encodeURIComponent(mensagem);
  window.open(`https://wa.me/${meuNumero}?text=${encodedMessage}`, "_blank");
}
