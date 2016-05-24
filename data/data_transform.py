#!/usr/bin/env python
import json

def load_data(file):
  try:
    return json.load(open(file, 'r', encoding='utf8'))
  except FileNotFoundError:
    print("File {} not found".format(file))
    return None

def extract_exhibition_data(data, cantons):
  exhibitions = {}
  all_artists = []
  for eh in data:
    artists = []

    for artist in eh['KuenstlerSuche'].split('#'):
      try:
        artists.append(int(artist))
        all_artists.append(artist)
      except ValueError:
        continue
    
    hauptNr = int(eh['Hauptnr'])
    canton = eh['Kanton']
    exhibitions[hauptNr] = {'Hauptnr': hauptNr, 'Kanton': canton, 'Titel': eh['Titel'], 'Ort': eh['Ort'], 'Institut': eh['Institut'], 'Url': eh['Url'], 'Datum': eh['Datum'], 'JahrVon': eh['JahrVon'], 'JahrBis': eh['JahrBis'], 'Werke': eh['Werke'], 'Artists': artists}
    cantons[canton]['exhibitions'].append(hauptNr)

  return exhibitions, all_artists

  
def extract_artist_data(data, cantons):
  artists = {}
  for a in data:
    hauptNr = int(a['Hauptnr'])
    canton = a['Kanton']
    artists[hauptNr] = { 'Hauptnr': hauptNr, 'Kanton': canton, 'Name': a['Name'],'Vorname': a['Vorname'], 'Aktivbeginn': a['Aktivbeginn'], 'Aktivende': a['Aktivende'], 'Lebensdaten': a['Lebensdaten'], 'Vitazeile': a['Vitazeile'], 'Rating': a['Rating'], 'Gattungen': a['Gattungen'], 'Werke': a['Werke']};
    cantons[canton]['artists'].append(hauptNr)

  return artists
  
  
def extract_werke_data(data):
  werke = {}
  for w in data:
    werke[int(w['Hauptnr'])] = w;

  return werke

  
def prepare_cantons():
  cantonsSet = {'ZH','BE','LU','UR','SZ','OW','NW','GL','ZG','FR','SO','BS','BL','SH','AR','AI','SG','GR','AG','TG','TI','VD','VS','NE','GE','JU'}
  cantons = {}
  for c in cantonsSet:
    cantons[c] = { 'Kanton': c, 'exhibitions': [], 'artists': []}

  return cantons

def export_json(exhibitions, artists, werke, cantons):

  output = {}
  output['exhibitions'] = exhibitions
  output['artists'] = artists
  output['werke'] = werke
  output['cantons'] = cantons
  with open('data.json', 'w', encoding='utf8') as outfile:
    json.dump(output, outfile, indent=4, ensure_ascii=False)


def main():
  cantons = prepare_cantons()
  data = load_data('exhibitions.json')
  exhibitions, all_artists = extract_exhibition_data(data, cantons)

  data = load_data('artists.json')
  artists = extract_artist_data(data, cantons)
  
  data = load_data('werke.json')
  werke = extract_werke_data(data)
  
  export_json(exhibitions, artists, werke, cantons)
  
  #print(artists["4000014"])

if __name__ == "__main__":
  main()