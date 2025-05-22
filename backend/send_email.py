import sys
import smtplib
from email.mime.text import MIMEText

def send_email(recipient_email):
    # Configura tu cuenta de correo
    sender_email = "pythonpracticaspam@gmail.com"
    sender_password = "vgzn rleu vhkl pwhf"

    # Contenido del correo
    subject = "¡Felicidades!"
    body = "¡Has registrado un nuevo record! 🎉"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = recipient_email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())
        print("Correo enviado exitosamente")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        send_email(sys.argv[1])
    else:
        print("No se proporcionó ningún correo electrónico.")
