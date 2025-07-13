<!DOCTYPE html><html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Malla Interactiva Química y Farmacia</title>
  <style>
    body {
      font-family: sans-serif;
      background-color: #fff0f5;
      padding: 20px;
    }
    .grid {
      display: flex;
      gap: 20px;
      overflow-x: auto;
    }
    .semester {
      background: #fff;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
      min-width: 200px;
    }
    .semester h3 {
      text-align: center;
    }
    .course {
      position: relative;
      background: #d0ebff; /* celeste pastel por defecto */
      padding: 5px;
      border-radius: 5px;
      margin: 5px 0;
      cursor: pointer;
      transition: background 0.2s;
    }
    .course.aprobado {
      background: #e6ccff !important; /* morado pastel */
    }
    .course.desbloqueado {
      background: #ffd6e8 !important; /* rosita pastel */
    }
    .estrella {
      position: absolute;
      top: 2px;
      right: 5px;
      color: #ffe599; /* amarillo pastel */
      font-size: 14px;
      display: none;
    }
    .course.aprobado .estrella {
      display: block;
    }
  </style>
</head>
<body>
  <h1>Malla Interactiva Química y Farmacia - UCN</h1>
  <p>Haz <strong>clic</strong> en los ramos que ya aprobaste. Se marcarán en morado 💜 y desbloquearán los que puedes tomar 🌸.<br>
  <em>Pasa el mouse por un ramo para ver qué ramos lo desbloquean ✨</em></p>
  <div class="grid" id="malla"></div>  <script>
    const cursos = {
      'Anatomía': ['Biología'],
      'Introducción a la Farmacia I': ['Introducción a la Farmacia II'],
      'Álgebra': ['Cálculo'],
      'Inglés 1': ['Inglés 2'],
      'Química General I': ['Química General II'],
      'Biología': ['Fisiopatología I'],
      'Química General II': ['Fisicoquímica Farmacéutica', 'Química Farmacéutica Org. I'],
      'Biofísica': ['Fisiopatología II'],
      'Fisiopatología I': ['Fisiopatología II', 'Inmunología'],
      'Fisicoquímica Farmacéutica': ['Bioquímica'],
      'Química Farmacéutica Org. I': ['Química Farmacéutica Org. II'],
      'Fisiopatología II': ['Microbiología'],
      'Analítica Farmacéutica': ['Taller Literatura Científica'],
      'Química Farmacéutica Org. II': ['Farmacología I'],
      'Bioquímica': ['Química Funcional'],
      'Inmunología': ['Microbiología'],
      'Taller Literatura Científica': ['Marketing Farmacéutico'],
      'Microbiología': ['Bioquímica Clínica'],
      'Química Funcional': ['Farmacoquímica II'],
      'Análisis Farmacéutico Instrume.': ['Tecnología Farmacéutica I'],
      'Farmacología I': ['Farmacología II'],
      'Bioquímica Clínica': ['Farmacia Asistencial'],
      'Tecnología Farmacéutica I': ['Tecnología Farmacéutica II'],
      'Farmacología II': ['Atención Farmacéutica', 'Bioestadística'],
      'Marketing Farmacéutico': ['Biofarmacia'],
      'Farmacoquímica I': ['Farmacoquímica II'],
      'Farmacia Asistencial': ['Legislación Farmacéutica'],
      'Tecnología Farmacéutica II': ['Farmacia Clínica'],
      'Atención Farmacéutica': ['Farmacia Asistencial'],
      'Biofarmacia': ['Farmacognosia'],
      'Integrador I: Taller de Empre.': ['Integrador II: Taller C.C.'],
      'Farmacia Clínica': ['Toxicología'],
      'Taller Farmacia Asistencial': ['Unidad de Investigación I'],
      'Farmacognosia': ['Toxicología'],
      'Integrador II: Taller C.C.': ['Integrador III: taller Atención.'],
      'Internado Farmacia Clínica': ['Unidad de Investigación II'],
      'Integrador III: taller Atención.': ['Unidad de Investigación II'],
      'Toxicología': ['Unidad de Investigación II'],
      'Unidad de Investigación I': ['Unidad de Investigación II']
    };

    const semestres = [
      ['Anatomía', 'Introducción a la Farmacia I', 'Álgebra', 'Inglés 1', 'Química General I', 'Introducción al Método Científico', 'Identidad, Univ. y Eq. de Género'],
      ['Biología', 'Introducción a la Farmacia II', 'Cálculo', 'Inglés 2', 'Química General II', 'Biofísica'],
      ['Fisiopatología I', 'Fisicoquímica Farmacéutica', 'Química Farmacéutica Org. I', 'Ser humano', 'Acondicionamiento Físico', 'Comunicación y desarrollo personal', 'Formación General Glob.'],
      ['Fisiopatología II', 'Formación Teológico', 'Analítica Farmacéutica', 'Química Farmacéutica Org. II', 'Bioquímica', 'Formación General Glob.', 'Inmunología'],
      ['Taller Literatura Científica', 'Microbiología', 'Química Funcional', 'Análisis Farmacéutico Instrume.', 'Farmacología I', 'Adm. Y Gestión en Farmacia'],
      ['Bioquímica Clínica', 'Tecnología Farmacéutica I', 'Farmacología II', 'Formación Profesional Electiva', 'Marketing Farmacéutico', 'Farmacoquímica I'],
      ['Farmacoquímica II', 'Tecnología Farmacéutica II', 'Atención Farmacéutica', 'Farmacia Asistencial', 'Biofarmacia', 'Integrador I: Taller de Empre.'],
      ['Farmacia Clínica', 'Bioestadística', 'Legislación Farmacéutica', 'Formación Profesional Electiva', 'Taller Farmacia Asistencial', 'Farmacognosia', 'Integrador II: Taller C.C.'],
      ['Formación General Electiva', 'Internado Farmacia Clínica', 'Formación General Teológica', 'Integrador III: taller Atención.', 'Toxicología', 'Unidad de Investigación I'],
      ['Unidad de Investigación II']
    ];

    const malla = document.getElementById('malla');
    const cursoDivs = {};
    const aprobados = new Set();

    function actualizarEstados() {
      for (const [name, div] of Object.entries(cursoDivs)) {
        div.classList.remove('aprobado', 'desbloqueado');
        div.style.background = '#d0ebff';
        div.title = '';
      }

      for (const name of aprobados) {
        if (cursoDivs[name]) {
          cursoDivs[name].classList.add('aprobado');
        }
      }

      for (const name of aprobados) {
        const desbloquea = cursos[name] || [];
        desbloquea.forEach(d => {
          if (!aprobados.has(d) && cursoDivs[d]) {
            cursoDivs[d].classList.add('desbloqueado');
          }
        });
      }

      for (const [curso, div] of Object.entries(cursoDivs)) {
        const requisitos = Object.entries(cursos)
          .filter(([key, values]) => values.includes(curso))
          .map(([k]) => k);
        if (requisitos.length > 0) {
          div.title = `Requiere: ${requisitos.join(', ')}`;
        }
      }
    }

    semestres.forEach((sem, index) => {
      const semDiv = document.createElement('div');
      semDiv.className = 'semester';
      semDiv.innerHTML = `<h3>Semestre ${index + 1}</h3>`;

      sem.forEach(curso => {
        const div = document.createElement('div');
        div.className = 'course';
        div.innerHTML = `<span class="estrella">★</span>${curso}`;
        div.onclick = () => {
          if (aprobados.has(curso)) {
            aprobados.delete(curso);
          } else {
            aprobados.add(curso);
          }
          actualizarEstados();
        };
        cursoDivs[curso] = div;
        semDiv.appendChild(div);
      });

      malla.appendChild(semDiv);
    });

    actualizarEstados();
  </script></body>
</html>
