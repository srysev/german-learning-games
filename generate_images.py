import os
import json
import time
import urllib.request
import urllib.error
import ssl
from pathlib import Path

# API-Schlüssel aus Umgebungsvariable oder direkt festlegen
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', 'dein-api-schlüssel-hier')

# Verzeichnis für die Bilder erstellen
output_dir = Path("public/images/sentences")
output_dir.mkdir(parents=True, exist_ok=True)

sentences = [
    # Thema: Geografie + Kategorie: Nomen
    {
        "sentence": "Der ___ ist der höchste Berg Deutschlands.",
        "answer": "Zugspitze",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung der Zugspitze im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur die reine Berg-Illustration. Berggipfel mit Schnee und Tannen im Vordergrund.",
        "filename": "zugspitze_berg"
    },
    {
        "sentence": "Der Amazonas ist der ___ mit dem größten Wasservolumen.",
        "answer": "Fluss",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung des Amazonas-Flusses im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur der Fluss mit Regenwald an den Ufern, aus der Vogelperspektive.",
        "filename": "amazonas_fluss"
    },
    
    # Thema: Geografie + Kategorie: Verben
    {
        "sentence": "Der Nil ___ durch Ägypten.",
        "answer": "fließt",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung des Nil-Flusses der durch die ägyptische Landschaft fließt, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Fluss mit Palmen und Pyramiden in der Ferne.",
        "filename": "nil_fliesst"
    },
    {
        "sentence": "Die Erde ___ sich einmal pro Tag um ihre Achse.",
        "answer": "dreht",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung der Erdrotation im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Die Erde mit angedeuteter Rotation durch Pfeile oder Bewegungslinien.",
        "filename": "erde_rotation"
    },
    
    # Thema: Wissenschaft + Kategorie: Adjektive
    {
        "sentence": "Diamanten sind extrem ___.",
        "answer": "hart",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines facettierten Diamanten im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur der Diamant mit klaren Kanten, der Härte symbolisiert.",
        "filename": "diamant_haerte"
    },
    {
        "sentence": "Elektronen sind ___ geladen.",
        "answer": "negativ",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines Atoms mit besonderem Fokus auf die Elektronen, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Atomkern mit umkreisenden Elektronen.",
        "filename": "elektron_negativ"
    },
    
    # Thema: Wissenschaft + Kategorie: Nomen
    {
        "sentence": "Die ___ ist für die Vererbung verantwortlich.",
        "answer": "DNA",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung der DNA-Doppelhelix im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur die spiralförmige DNA-Struktur.",
        "filename": "dna_vererbung"
    },
    {
        "sentence": "Das ___ ist das Zentrum unseres Sonnensystems.",
        "answer": "Sonne",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung des Sonnensystems mit der Sonne im Zentrum, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Sonne mit umkreisenden Planeten.",
        "filename": "sonne_zentrum"
    },
    
    # Thema: Geschichte + Kategorie: Verben
    {
        "sentence": "Das Römische Reich ___ im Jahr 476 n. Chr.",
        "answer": "endete",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines zerfallenden römischen Tempels oder Kolosseums, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur die Architektur, die Verfall symbolisiert.",
        "filename": "rom_ende"
    },
    {
        "sentence": "Christopher Kolumbus ___ 1492 Amerika.",
        "answer": "entdeckte",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung von Kolumbus' Schiff, das an einer Küste ankommt, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Schiff mit Landschaft im Hintergrund.",
        "filename": "kolumbus_entdeckung"
    },
    
    # Thema: Geschichte + Kategorie: Nomen
    {
        "sentence": "Leonardo da Vinci malte die ___.",
        "answer": "Mona Lisa",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung der Mona Lisa im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur das Portrait selbst, kein Rahmen oder Museumsumgebung.",
        "filename": "mona_lisa"
    },
    {
        "sentence": "Die ___ wurden im antiken Rom gebaut.",
        "answer": "Aquädukte",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines römischen Aquädukts im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur die Architektur in einer Landschaft.",
        "filename": "roemische_aquaedukte"
    },
    
    # Thema: Musik + Kategorie: Nomen
    {
        "sentence": "Ein ___ hat 88 Tasten.",
        "answer": "Klavier",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines Klaviers mit sichtbaren Tasten, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur das Instrument, eventuell etwas geöffnet, um die Tasten gut zu sehen.",
        "filename": "klavier_tasten"
    },
    {
        "sentence": "Die ___ ist ein Streichinstrument.",
        "answer": "Violine",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung einer Violine mit Bogen im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur das Instrument mit seinen charakteristischen Merkmalen.",
        "filename": "violine_streichinstrument"
    },
    
    # Thema: Musik + Kategorie: Verben
    {
        "sentence": "Ein Dirigent ___ das Orchester.",
        "answer": "leitet",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines Dirigenten vor einem Orchester im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Der Dirigent mit Taktstock und angedeutete Musiker im Hintergrund.",
        "filename": "dirigent_leitet"
    },
    {
        "sentence": "Komponisten ___ Musikstücke.",
        "answer": "schreiben",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines Komponisten an einem Schreibtisch, der Noten auf ein Notenblatt schreibt, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur die Person mit Notenpapier.",
        "filename": "komponist_schreibt"
    },
    
    # Thema: Sport + Kategorie: Adjektive
    {
        "sentence": "Der Marathon ist ein ___ Lauf.",
        "answer": "langer",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung von Marathonläufern auf einer langen Strecke im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Läufer auf einer sich in die Ferne schlängelnden Strecke.",
        "filename": "marathon_lang"
    },
    {
        "sentence": "Beim Fußball ist das Spielfeld ___.",
        "answer": "rechteckig",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines rechteckigen Fußballfeldes aus der Vogelperspektive im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur das Spielfeld mit Markierungen und Toren.",
        "filename": "fussballfeld_rechteckig"
    },
    
    # Thema: Sport + Kategorie: Präpositionen
    {
        "sentence": "Die Olympischen Spiele finden alle vier Jahre ___ einem anderen Land statt.",
        "answer": "in",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines olympischen Stadions mit den olympischen Ringen darüber im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Stadion mit angedeuteter Weltkarte im Hintergrund.",
        "filename": "olympia_laender"
    },
    {
        "sentence": "Der Fußballspieler schoss den Ball ___ das Tor.",
        "answer": "in",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines Fußballspielers, der gerade den Ball Richtung Tor schießt, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur der Spieler, Ball und Tor.",
        "filename": "fussball_tor"
    },
    
    # Thema: Naturwissenschaften + Kategorie: Nomen
    {
        "sentence": "Wasser besteht aus Wasserstoff und ___.",
        "answer": "Sauerstoff",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines H2O-Moleküls im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur die Molekülstruktur mit den Atomen und Verbindungen.",
        "filename": "wasser_molekuel"
    },
    {
        "sentence": "Die ___ sorgt für die Schwerkraft auf der Erde.",
        "answer": "Gravitation",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung der Erde, die Objekte durch Gravitation anzieht, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Erde mit angedeuteten Kraftfeldern oder fallenden Objekten.",
        "filename": "gravitation_kraft"
    },
    
    # Thema: Naturwissenschaften + Kategorie: Verben
    {
        "sentence": "Magnete ___ Eisen an.",
        "answer": "ziehen",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung eines Hufeisenmagneten, der Eisenspäne oder Nägel anzieht, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Nur der Magnet mit den angezogenen Objekten.",
        "filename": "magnet_anziehung"
    },
    {
        "sentence": "Pflanzen ___ Sauerstoff.",
        "answer": "produzieren",
        "prompt": "Eine detaillierte schwarz-weiße Strichzeichnung einer Pflanze, die im Sonnenlicht Fotosynthese betreibt, im Stile einer Lehrbuchillustration. Klare Bleistiftlinien, keine Texte, keine Beschriftungen, keine Rahmungen. Pflanze mit angedeuteter Sonne und Sauerstoffabgabe durch Blätter.",
        "filename": "pflanzen_sauerstoff"
    }
]
def generate_image(prompt, filename):
    """
    Generiert ein Bild mit DALL-E basierend auf einem Prompt und speichert es ab
    """
    try:
        # Überprüfe, ob die Datei bereits existiert
        file_path = output_dir / f"{filename}.png"
        if file_path.exists():
            print(f"Bild für '{filename}' existiert bereits, wird übersprungen.")
            return
            
        # API-Anfrage vorbereiten
        url = "https://api.openai.com/v1/images/generations"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENAI_API_KEY}"
        }
        data = {
            "model": "dall-e-3",
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024"
        }
        
        # JSON-Daten kodieren
        json_data = json.dumps(data).encode('utf-8')
        
        # Request erstellen
        req = urllib.request.Request(url, data=json_data, headers=headers, method="POST")
        
        # SSL-Kontext für HTTPS-Anfragen
        context = ssl.create_default_context()
        
        # Anfrage senden
        with urllib.request.urlopen(req, context=context) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            # Bild-URL extrahieren
            image_url = result["data"][0]["url"]
            
            # Bild herunterladen
            img_req = urllib.request.Request(image_url)
            with urllib.request.urlopen(img_req, context=context) as img_response:
                img_data = img_response.read()
                
                # Bild speichern
                with open(file_path, "wb") as img_file:
                    img_file.write(img_data)
                    
                print(f"Bild für '{filename}' wurde erfolgreich gespeichert.")
                
    except urllib.error.HTTPError as e:
        print(f"HTTP-Fehler bei der Generierung des Bildes für '{filename}':")
        print(f"Status: {e.code}")
        print(f"Grund: {e.reason}")
        response_data = json.loads(e.read().decode('utf-8'))
        print(f"Antwort: {json.dumps(response_data, indent=2)}")
    except Exception as e:
        print(f"Fehler bei der Generierung des Bildes für '{filename}':")
        print(str(e))

def generate_all_images():
    """
    Generiert Bilder für alle Sätze in der Liste
    """
    for i, item in enumerate(sentences):
        print(f"[{i+1}/{len(sentences)}] Generiere Bild für: {item['filename']}")
        generate_image(item["prompt"], item["filename"])
        # Pause zwischen API-Aufrufen, um Rate Limits zu vermeiden
        #if i < len(sentences) - 1:  # Keine Pause nach dem letzten Bild
        #    print("Warte 3 Sekunden vor dem nächsten API-Aufruf...")
        #    time.sleep(3)
        
    print(f"Fertig! {len(sentences)} Bilder wurden generiert oder waren bereits vorhanden.")
    print(f"Bilder wurden im Verzeichnis '{output_dir}' gespeichert.")

def generate_image_update_stub():
    """
    Erzeugt einen JavaScript-Code-Snippet zur Aktualisierung des allSentences-Arrays
    """
    update_code = []
    for item in sentences:
        update_code.append(f"""
// Für den Satz: "{item['sentence']}"
// Antwort: "{item['answer']}"
// Füge folgende Zeile hinzu:
imageUrl: "/images/sentences/{item['filename']}.png",""")
    
    with open("update_sentences.js", "w", encoding="utf-8") as f:
        f.write("// Füge diese imageUrl-Eigenschaft zu den entsprechenden Sätzen in allSentences hinzu\n")
        f.write("\n".join(update_code))
    
    print("JavaScript-Update-Snippet wurde in 'update_sentences.js' gespeichert.")

if __name__ == "__main__":
    # Prüfe, ob API-Schlüssel gesetzt ist
    if OPENAI_API_KEY == 'dein-api-schlüssel-hier':
        print("Bitte setze deinen OpenAI API-Schlüssel im Skript oder als Umgebungsvariable 'OPENAI_API_KEY'.")
    else:
        print(f"Starte Bildgenerierung für {len(sentences)} Sätze...")
        generate_all_images()
        # Erzeuge JavaScript-Update-Hilfe
        generate_image_update_stub()