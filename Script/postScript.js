async function cargarPosts() {
  try {
    const res = await fetch("http://localhost/server_sw1/post.php");
    const posts = await res.json();

    const cont = document.getElementById("contenedorPosts");
    cont.innerHTML = "";

    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post-card";

      div.innerHTML = `
        <h3>${post.titulo}</h3>
        <p>${post.descripcion}</p>
        <img src="http://localhost/server_sw1/imagen.php?id=${post.id_post}" alt="Imagen del post" class="imagen-post">

        <button class="btn-like" data-type="post" data-id="${post.id_post}">
          <img src="../img/nomegusta.png" alt="like" class="icon-like">
        </button>
        <span class="like-count">${post.likes}</span>

        <div class="comentarios-section">
          <button class="toggle-comentarios">Ocultar comentarios</button>
          <h4>Comentarios</h4>
          <div class="comentarios">
            ${post.comentarios.map(c => `
              <div class="comentario">
                <p>${c.descripcion}</p>
                <button class="btn-like" data-type="comentario" data-id="${c.id_comentario}">
                  <img src="../assets/img/nomegusta.png" alt="like" class="icon-like">
                </button>
                <span class="like-count">${c.likes}</span>
              </div>
            `).join("")}
          </div>

          <form class="form-comentario" data-post="${post.id_post}">
            <input type="text" name="descripcion" placeholder="Escribe un comentario..." required>
            <button type="submit">Comentar</button>
          </form>
        </div>
      `;

      cont.appendChild(div);
    });

    activarBotonesLike();
    activarFormularioComentarios();
    activarBotonToggleComentarios();
  } catch (e) {
    console.error("Error al cargar posts:", e);
  }
}

function activarBotonesLike() {
  document.querySelectorAll(".btn-like").forEach(btn => {
    btn.addEventListener("click", async () => {
      const type = btn.getAttribute("data-type");
      const id = btn.getAttribute("data-id");

      let data = {};
      if (type === "post") data.post_id = id;
      else data.comentario_id = id;

      try {
        const res = await fetch("http://localhost/server_sw1/like.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data)
        });
        const result = await res.json();

        const img = btn.querySelector("img");
        const count = btn.nextElementSibling;
        let num = parseInt(count.textContent);

        if (result.status === "liked") {
          img.src = "../img/megusta.png";
          count.textContent = num + 1;
        } else if (result.status === "unliked") {
          img.src = "../img/nomegusta.png";
          count.textContent = num - 1;
        }
      } catch (err) {
        console.error("Error al procesar like:", err);
      }
    });
  });
}

function activarFormularioComentarios() {
  document.querySelectorAll(".form-comentario").forEach(form => {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const postId = form.getAttribute("data-post");
      const descripcion = form.querySelector("input[name='descripcion']").value;

      const datos = new URLSearchParams();
      datos.append("post_id", postId);
      datos.append("descripcion", descripcion);

      try {
        const res = await fetch("http://localhost/server_sw1/agregarcomentario.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: datos.toString()
        });
        const result = await res.json();

        if (result.estado === "ok") {
          form.reset();
          cargarPosts(); // recarga los posts para mostrar el nuevo comentario
        } else {
          alert("Error al comentar: " + result.mensaje);
        }
      } catch (err) {
        console.error("Error al enviar comentario:", err);
      }
    });
  });
}

function activarBotonToggleComentarios() {
  document.querySelectorAll(".toggle-comentarios").forEach(btn => {
    btn.addEventListener("click", () => {
      const comentarios = btn.parentElement.querySelector(".comentarios");
      const formulario = btn.parentElement.querySelector(".form-comentario");

      const visible = comentarios.style.display !== "none";
      comentarios.style.display = visible ? "none" : "block";
      formulario.style.display = visible ? "none" : "flex";
      btn.textContent = visible ? "Mostrar comentarios" : "Ocultar comentarios";
    });
  });
}

document.addEventListener("DOMContentLoaded", cargarPosts);