import Carousel from "./TemplateCarousel";

export default function TemplateCarousel() {
  const templates = [
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqBWHnKw97MVaOvjF0VRHwtJ0wEgVBhPjhMTBOK88sd_q_6Atdv7uxfhfvHJQH0bW7mK7YHXLfDXQbNHlen3RQdRuL0SBwodi1SCngVDyXyGpX0uXl2WaYuQiUfzPC7krPI9zdL2knJb3BxPxEERx1b3NMYT1O1B6-Llj1DLd78jpbSx1leQ2kiLA5eeL8RtM5dHeT0CpB0i4rL85wASNwIQpWUoF8iMiLgbYuYOT1wecVW5sN5yediIfQQlM3aOgax0tv-ovMlFDP",
      title: "Presentación",
      description: "Crea diapositivas impactantes"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVVqFtGzzHbboylJdCcxiL0uY7fuxq6qhhJXYD5QE1bOWMMEAKa9ooKHFYfajHJoa3l_sVIXlRlX2nkhAE-1v0x5mNpWDRpPYXqV6L93-Ff2zBmIhiu0hpVe9lu4ys7OC0Nt4BtSi6LsqshCEnGvCYsXuLAMfJTNfq7NqNtOjS4lSVT18mYqLnse6N1HIlt5-_qW7a6Ee8EJmsSW0sQKP2gKJRv_hFWZ-D7Md6WRnhuazi3w7g6qrJCsANayoEZN2C6WOYWjjDQ4Bq",
      title: "Flyer",
      description: "Promociona tu evento"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEKylKYOsefehrNHKsSVjnyo6PzhBySkv4A_BHmfZ1qCCdZLescDhDuOn0A9Dj-GJs1Lf-qH5C_hBLFA0h5yn65Hg3CKRCUYl3Dg4bkoM5w8pqtMTdcRpMiKhxQ7XuyBpewd6M3DRnHaaXagBacVUpQ4dbA7126TG3o8ucT2UTPJwR5eT3uFGGcMQSoIoz57VMgK8_sZSLAiV3SSMqim0N7h0l5d1cWjVCzhnkR20Mu4Qa0RXuIpVaY6srd73PG5a3B6XevCvtWW39",
      title: "Logo",
      description: "Diseña tu marca"
    },

    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQLXkVZXpQzMckN3zDqS_TScR0DiwrLkcW6e-yfH5YV33iLVb7u2H---iX2iw8kjEHRtaj6npWlphjGBjtSTaW7CpKT1sjqdwpz2UPJFUB13QG63RigrofGZfAYihWsrUQbMFsftjXAjdFJd3ZaceNjiKmRcGS18eANV_rMLtmEglwLqadf7Q7VsF7iz6EX2h8fuhRAHb-oOhzK5XDi8t1zy10BV7Zfof9W0VG0tkCH4E8bkDx_PIN0d5XwWXgu6uuMy4gu0j2jP3J",
      title: "Presentación",
      description: "Crea diapositivas impactantes"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcWH-6Kc_N7KREs-EToB6SEoQtzZUxxtdTNcOu_NzGQWyabRbamcKdWu2B5lELprQzd0RuZKhg61YgACvRfZJFA93IeEnLRSt9cZL6pfvibrJt4obYm0gPUrSA-5DziBY67531vYcik2y7yCx7hLOWN7nwdI3M7gtQrSdC_BB0O5M6p_LH1dzzHTAAp-OQ1Eoq0VDph6qfaoBEMX5KMUvxmljdSx2F6156H6XhnYEz_U2iaQ5NI7VUWqZSYQWIuR4-iNERTK9SAfBd",
      title: "Flyer",
      description: "Promociona tu evento"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASNVAWKgpq2edY6OMt5RcwrImqOEOJKb1N6RU2ki43R2zMjx3FzLPWR5GQgVHaPZolqJZO5r3mH1XJUty02Mm6-lWR5QcFnL_xtJswEHQQsNBLE18I_dQq9MgtopCD_5omn5Y1ZJaFGtnY8Np2OZHIqzXwTI7NLsi-W8Paxsmm70U9hM4v3FUhhaBz8sNs7wLeE-Pek02QUmzqbbe93cwTjdiTB0Rvm2QWP7v2c-xtQHBkbFb3L0jt7c2ZHHODcy5iMaPsSO7OnTPh",
      title: "Logo",
      description: "Diseña tu marca"
    },
    {
      img: "https://lh3.googleusercontent.com/...",
      title: "Presentación",
      description: "Crea diapositivas impactantes"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqbWZ8WmgeghcZLeOXCH_fU2C0Qklqcwp4e3I91T_DsxYaxON_PF9RIuQutmHhdfUoW6IIwV5Idf_cGj-RhQHhRvQ22T0nrpDtyrrrHa3-oYjgY5KGOydJTqKHx5JpxIRX8qHbA1Q08_y0oRcXVkHHCv-Qr7I4JJFTH8mvVdSoHcJd6AO4TR9w9OsfDCikubDcivlTmE3gzR3pbJNjGQuHNXyLgs3aXNSgxh007mPvvc830if1TMyT7AL4TcZWBN7MA2EEAjkpy9AM",
      title: "Flyer",
      description: "Promociona tu evento"
    },
    {
      img: "https://lh3.googleusercontent.com/...",
      title: "Logo",
      description: "Diseña tu marca"
    },
    {
      img: "https://lh3.googleusercontent.com/...",
      title: "Presentación2",
      description: "Crea diapositivas impactantes"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqbWZ8WmgeghcZLeOXCH_fU2C0Qklqcwp4e3I91T_DsxYaxON_PF9RIuQutmHhdfUoW6IIwV5Idf_cGj-RhQHhRvQ22T0nrpDtyrrrHa3-oYjgY5KGOydJTqKHx5JpxIRX8qHbA1Q08_y0oRcXVkHHCv-Qr7I4JJFTH8mvVdSoHcJd6AO4TR9w9OsfDCikubDcivlTmE3gzR3pbJNjGQuHNXyLgs3aXNSgxh007mPvvc830if1TMyT7AL4TcZWBN7MA2EEAjkpy9AM",
      title: "Flyer2",
      description: "Promociona tu evento"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASNVAWKgpq2edY6OMt5RcwrImqOEOJKb1N6RU2ki43R2zMjx3FzLPWR5GQgVHaPZolqJZO5r3mH1XJUty02Mm6-lWR5QcFnL_xtJswEHQQsNBLE18I_dQq9MgtopCD_5omn5Y1ZJaFGtnY8Np2OZHIqzXwTI7NLsi-W8Paxsmm70U9hM4v3FUhhaBz8sNs7wLeE-Pek02QUmzqbbe93cwTjdiTB0Rvm2QWP7v2c-xtQHBkbFb3L0jt7c2ZHHODcy5iMaPsSO7OnTPh",
      title: "Logo2",
      description: "Diseña tu marca"
    }
  ];
  const projects = [
    {
      img: "	https://template.canva.com/EAF61wu7Pgk/2/0/600w-sOiE5b9j4f4.jpg",
      title: "Dashboard1",
      description: "Crea diapositivas impactantes"
    },
    {
      img: "https://template.canva.com/EAFYD23hl0U/2/0/600w-9UxhqpV6Jc8.jpg",
      title: "Flyer",
      description: "Promociona tu evento"
    },
    {
      img: "https://template.canva.com/EAFRHfY0ep4/3/0/800w-CBUy5mjzr3U.jpg",
      title: "Logo",
      description: "Diseña tu marca"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQLXkVZXpQzMckN3zDqS_TScR0DiwrLkcW6e-yfH5YV33iLVb7u2H---iX2iw8kjEHRtaj6npWlphjGBjtSTaW7CpKT1sjqdwpz2UPJFUB13QG63RigrofGZfAYihWsrUQbMFsftjXAjdFJd3ZaceNjiKmRcGS18eANV_rMLtmEglwLqadf7Q7VsF7iz6EX2h8fuhRAHb-oOhzK5XDi8t1zy10BV7Zfof9W0VG0tkCH4E8bkDx_PIN0d5XwWXgu6uuMy4gu0j2jP3J",
      title: "Presentación",
      description: "Crea diapositivas impactantes"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcWH-6Kc_N7KREs-EToB6SEoQtzZUxxtdTNcOu_NzGQWyabRbamcKdWu2B5lELprQzd0RuZKhg61YgACvRfZJFA93IeEnLRSt9cZL6pfvibrJt4obYm0gPUrSA-5DziBY67531vYcik2y7yCx7hLOWN7nwdI3M7gtQrSdC_BB0O5M6p_LH1dzzHTAAp-OQ1Eoq0VDph6qfaoBEMX5KMUvxmljdSx2F6156H6XhnYEz_U2iaQ5NI7VUWqZSYQWIuR4-iNERTK9SAfBd",
      title: "Flyer",
      description: "Promociona tu evento"
    },
    {
      img: "https://template.canva.com/EAGR2Hv-wSE/1/0/800w-LRVfYrPDZGI.jpg",
      title: "Logo",
      description: "Diseña tu marca"
    },
    {
      img: "https://lh3.googleusercontent.com/...",
      title: "Presentación",
      description: "Crea diapositivas impactantes"
    },
    {
      img: "https://template.canva.com/EAFb-Ev9CEQ/3/0/800w-JHUo0NYD60Y.jpg",
      title: "Flyer",
      description: "Promociona tu evento"
    },
  ];



  return (
    <>
    <Carousel title="Mis proyectos" items={projects} />
    <Carousel title="Empieza con una plantilla" items={templates} /> 
</>
  );
}
