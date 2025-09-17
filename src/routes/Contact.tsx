export default function Contact() {
  return (
    <div className="container">
      <h1>Contact</h1>
      <form className="checkout-form" onSubmit={e => { e.preventDefault(); alert('Message envoyé (simulation)'); }}>
        <label>Nom<input required /></label>
        <label>Email<input type="email" required /></label>
        <label>Message<textarea style={{ width: '100%', minHeight: 120, padding: 10, border: '1px solid var(--border)', borderRadius: 8 }} required /></label>
        <button className="btn" type="submit">Envoyer</button>
      </form>
    </div>
  );
}


