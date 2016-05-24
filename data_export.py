#!/usr/bin/env python
import json

def load_data(file):
  try:
    return json.load(open(file))
  except FileNotFoundError:
    print("File {} not found".format(file))
    return None


def extract_exhibition_data(data):
  exhibitions = []
  all_artists = []
  for exhibition in data:
    artists = []

    for artist in exhibition['KUENSTLER_NAMENSSUCHE'].split('#'):
      try:
        artists.append(int(artist))
        all_artists.append(artist)
      except ValueError:
        continue
    ex = {'HAUPTNR': int(exhibition['HAUPTNR']), 'AUSST_TITEL': exhibition['AUSST_TITEL'], 'AUSST_ORT': exhibition['AUSST_ORT'], 'MONAT': exhibition['MONAT'], 'TAG': exhibition['TAG'], 'ARTISTS': artists}
    exhibitions.append(ex)

  return exhibitions, all_artists


def create_artists_query(artists):
  base_query = "SELECT * FROM `Person` where "
  a = ' or `HAUPTNR` = '.join(artists)

  f = open('person_query.txt','w')
  f.write(base_query + a)
  f.close() 
  

def export_json(exhibitions, persons):

  output = {}
  output['exhibitions'] = exhibitions
  output['persons'] = persons
  with open('data.json', 'w', encoding='utf8') as outfile:
    json.dump(output, outfile, indent=4, ensure_ascii=False)

def extract_person_data(data):
  persons = []
  for person in data:
    p = { 'HAUPTNR': int(person['HAUPTNR']), 'NAME': person['NAME'], 'VORNAME': person['VORNAME'],'GESCHLECHT': person['GESCHLECHT'], 'RATING': len(person['RATING']), 'GEBJAHR': person['GEBJAHR'], 'TODJAHR': person['TODJAHR'], 'LEBENSDATEN': person['LEBENSDATEN'], 'VITAZEILE': person['VITAZEILE'], 'AKTIVBEGINN': person['AKTIVBEGINN'], 'AKTIVENDE': person['AKTIVENDE'], 'NATIONALITAET': person['NATIONALITAET']}
    persons.append(p)

  return persons

def main():
  data = load_data('Ausstellung.json')

  exhibitions, all_artists = extract_exhibition_data(data)
  create_artists_query(all_artists)

  data = load_data('Person.json')
  persons = extract_person_data(data)
  export_json(exhibitions, persons)


if __name__ == "__main__":
  main()