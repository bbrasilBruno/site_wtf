// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navbar = document.getElementById("navbar")
  const backToTop = document.getElementById("back-to-top")
  const contactForm = document.getElementById("contato-form")
  const emailjs = window.emailjs // Declare the emailjs variable

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Back to top button
    if (window.scrollY > 500) {
      backToTop.classList.add("visible")
    } else {
      backToTop.classList.remove("visible")
    }
  })

  // Back to top functionality
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 70 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Contact form handling
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Simple validation
    if (!data.nome || !data.email || !data.mensagem) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      alert("Por favor, insira um e-mail válido.")
      return
    }

    // Botão de envio
    const submitButton = contactForm.querySelector(".cta-button")
    const originalText = submitButton.textContent
    submitButton.textContent = "Enviando..."
    submitButton.disabled = true

    // Enviar com EmailJS
    emailjs
      .send("service_gbtyghe", "template_wtf_consult", {
        from_name: data.nome,
        from_email: data.email,
        phone: data.telefone || "Não informado",
        company: data.empresa || "Não informado",
        message: data.mensagem,
        to_email: "andre.wtfconsult@gmail.com",
      })
      .then(() => {
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
        contactForm.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      })
      .catch((error) => {
        console.error("Erro EmailJS:", error)
        alert("Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.")
        submitButton.textContent = originalText
        submitButton.disabled = false
      })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".pilar-card, .identidade-card, .diferencial-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Hero scroll indicator
  const heroScroll = document.querySelector(".hero-scroll")
  if (heroScroll) {
    heroScroll.addEventListener("click", () => {
      document.querySelector("#identidade").scrollIntoView({
        behavior: "smooth",
      })
    })
  }

  // Add loading animation to CTA buttons
  document.querySelectorAll(".cta-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.type !== "submit") {
        // Add ripple effect
        const ripple = document.createElement("span")
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.width = ripple.style.height = size + "px"
        ripple.style.left = x + "px"
        ripple.style.top = y + "px"
        ripple.classList.add("ripple")

        this.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      }
    })
  })

  // Console log for debugging
  console.log("[v0] WTF Consult website loaded successfully")
  console.log("[v0] Navigation, animations, and form handling initialized")
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`
document.head.appendChild(style)
