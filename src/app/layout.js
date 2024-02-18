import './styles/style.scss'

export const metadata = {
  title: "Task Desk",
  description: "Gerenciador de Tarefas Pessoais",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
