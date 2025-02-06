# from flask import Flask, request, jsonify, send_file
# import requests
# import folium
# from geopy.distance import geodesic
# import pandas as pd
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# class HEREMedicalFinder:
#     def __init__(self, api_key):
#         self.api_key = api_key
#         self.base_url = "https://discover.search.hereapi.com/v1/discover"

#     def find_medical_facilities(self, latitude, longitude, radius=5000):
#         facilities = []
#         categories = ['hospital', 'pharmacy', 'medical-facility', 'doctor', 'healthcare-facility']

#         for category in categories:
#             params = {
#                 'apiKey': self.api_key,
#                 'at': f"{latitude},{longitude}",
#                 'limit': 50,
#                 'q': category,
#                 'radius': radius
#             }

#             try:
#                 response = requests.get(self.base_url, params=params)
#                 response.raise_for_status()
#                 results = response.json()

#                 for item in results.get('items', []):
#                     distance = geodesic(
#                         (latitude, longitude),
#                         (item['position']['lat'], item['position']['lng'])
#                     ).kilometers

#                     facility = {
#                         'name': item.get('title', 'Unknown'),
#                         'type': category.replace('-', ' ').title(),
#                         'distance': round(distance, 2),
#                         'address': item.get('address', {}).get('label', 'Address not available'),
#                         'phone': item.get('contacts', [{}])[0].get('phone', [{}])[0].get('value', 'Not available')
#                         if 'contacts' in item else 'Not available',
#                         'location': {
#                             'lat': item['position']['lat'],
#                             'lng': item['position']['lng']
#                         }
#                     }

#                     if 'openingHours' in item:
#                         facility['hours'] = item['openingHours'][0].get('text', 'Hours not available')

#                     facilities.append(facility)

#             except requests.exceptions.RequestException as e:
#                 print(f"Error fetching {category}: {e}")
#                 continue

#         return sorted(facilities, key=lambda x: x['distance'])

#     def create_map(self, facilities, center_lat, center_lng):
#         """Create an interactive map with facility markers."""
#         m = folium.Map(location=[center_lat, center_lng], zoom_start=14)

#         folium.Marker(
#             [center_lat, center_lng],
#             popup='Your Location',
#             icon=folium.Icon(color='red', icon='info-sign')
#         ).add_to(m)

#         for facility in facilities:
#             popup_html = f"""
#                 <b>{facility['name']}</b><br>
#                 Type: {facility['type']}<br>
#                 Distance: {facility['distance']} km<br>
#                 Phone: {facility['phone']}<br>
#                 Address: {facility['address']}<br>
#             """
#             if 'hours' in facility:
#                 popup_html += f"Hours: {facility['hours']}"

#             folium.Marker(
#                 [facility['location']['lat'], facility['location']['lng']],
#                 popup=folium.Popup(popup_html, max_width=300),
#                 icon=folium.Icon(color='green')
#             ).add_to(m)

#         return m

#     def generate_report(self, facilities):
#         """Generate a summary report of the facilities."""
#         if not facilities:
#             return None, {'total_facilities': 0}

#         df = pd.DataFrame(facilities)

#         stats = {
#             'total_facilities': len(facilities),
#             'types_breakdown': df['type'].value_counts().to_dict(),
#             'average_distance': round(df['distance'].mean(), 2),
#             'nearest_facility': df.loc[df['distance'].idxmin(), 'name'],
#             'nearest_distance': round(df['distance'].min(), 2)
#         }

#         return df, stats


# # Replace with your HERE API key
# API_KEY = 'BMU4HbuydpxWUI2stgBX976edrRcU8ytVF6XnPnRSG8'
# finder = HEREMedicalFinder(API_KEY)


# @app.route('/find_medical_facilities', methods=['POST'])
# def find_facilities():
#     data = request.get_json()
    
#     # Validate input
#     if not data or 'latitude' not in data or 'longitude' not in data:
#         return jsonify({"error": "Please provide 'latitude' and 'longitude'"}), 400

#     latitude = float(data['latitude'])
#     longitude = float(data['longitude'])
#     radius = int(data.get('radius', 5000))

#     facilities = finder.find_medical_facilities(latitude, longitude, radius)
    
#     if not facilities:
#         return jsonify({"message": "No medical facilities found within the specified radius"}), 404

#     df, stats = finder.generate_report(facilities)
    
#     # Generate map and save
#     map_obj = finder.create_map(facilities, latitude, longitude)
#     map_filename = "medical_facilities_map.html"
#     map_obj.save(map_filename)

#     response_data = {
#         "total_facilities": stats["total_facilities"],
#         "average_distance": stats["average_distance"],
#         "nearest_facility": stats["nearest_facility"],
#         "nearest_distance": stats["nearest_distance"],
#         "facilities": facilities,
#         "map_url": f"/get_map"
#     }

#     return jsonify(response_data)


# @app.route('/get_map', methods=['GET'])
# def get_map():
#     """Serve the generated map."""
#     return send_file("medical_facilities_map.html")



# if __name__ == '__main__':
#     app.run(debug=True)


#ABOVE CODE IS OF IMPORTANCE -> WITHOUT FILTER FEATURE


from flask import Flask, request, jsonify, send_file
import requests
import folium
from geopy.distance import geodesic
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class HEREMedicalFinder:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://discover.search.hereapi.com/v1/discover"

    def find_medical_facilities(self, latitude, longitude, facility_type=None, radius=5000):
        facilities = []
        # If facility_type is provided and not 'all', only search for that type
        categories = [facility_type] if facility_type and facility_type != 'all' else ['hospital', 'pharmacy', 'medical-facility', 'doctor', 'healthcare-facility']

        for category in categories:
            params = {
                'apiKey': self.api_key,
                'at': f"{latitude},{longitude}",
                'limit': 50,
                'q': category,
                'radius': radius
            }

            try:
                response = requests.get(self.base_url, params=params)
                response.raise_for_status()
                results = response.json()

                for item in results.get('items', []):
                    distance = geodesic(
                        (latitude, longitude),
                        (item['position']['lat'], item['position']['lng'])
                    ).kilometers

                    facility = {
                        'name': item.get('title', 'Unknown'),
                        'type': category.replace('-', ' ').title(),
                        'distance': round(distance, 2),
                        'address': item.get('address', {}).get('label', 'Address not available'),
                        'location': {
                            'lat': item['position']['lat'],
                            'lng': item['position']['lng']
                        }
                    }
                    facilities.append(facility)

            except requests.exceptions.RequestException as e:
                print(f"Error fetching {category}: {e}")
                continue

        return sorted(facilities, key=lambda x: x['distance'])

    def create_map(self, facilities, center_lat, center_lng):
        m = folium.Map(location=[center_lat, center_lng], zoom_start=14)

        # Add user location marker
        folium.Marker(
            [center_lat, center_lng],
            popup='Your Location',
            icon=folium.Icon(color='red', icon='info-sign')
        ).add_to(m)

        # Add facility markers
        for facility in facilities:
            popup_html = f"""
                <b>{facility['name']}</b><br>
                Type: {facility['type']}<br>
                Distance: {facility['distance']} km<br>
                Address: {facility['address']}<br>
            """

            folium.Marker(
                [facility['location']['lat'], facility['location']['lng']],
                popup=folium.Popup(popup_html, max_width=300),
                icon=folium.Icon(color='green')
            ).add_to(m)

        return m

# Replace with your HERE API key
API_KEY = 'BMU4HbuydpxWUI2stgBX976edrRcU8ytVF6XnPnRSG8'
finder = HEREMedicalFinder(API_KEY)

@app.route('/find_medical_facilities', methods=['POST'])
def find_facilities():
    data = request.get_json()
    
    if not data or 'latitude' not in data or 'longitude' not in data:
        return jsonify({"error": "Please provide latitude and longitude"}), 400

    latitude = float(data['latitude'])
    longitude = float(data['longitude'])
    radius = int(data.get('radius', 5000))
    facility_type = data.get('facilityType')  # This can be None or a specific type

    facilities = finder.find_medical_facilities(latitude, longitude, facility_type, radius)
    
    if not facilities:
        return jsonify({"message": "No medical facilities found within the specified radius"}), 404

    # Generate map
    map_obj = finder.create_map(facilities, latitude, longitude)
    map_filename = "medical_facilities_map.html"
    map_obj.save(map_filename)

    return jsonify({
        "facilities": facilities,
        "total_facilities": len(facilities),
    })

@app.route('/get_map', methods=['GET'])
def get_map():
    return send_file("medical_facilities_map.html")

if __name__ == '__main__':
    app.run(debug=True)
