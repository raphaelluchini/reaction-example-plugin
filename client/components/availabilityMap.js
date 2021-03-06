import React from "react";
import PropTypes from "prop-types";
import { DocHead } from "meteor/kadira:dochead";
import { $ } from "meteor/jquery";
import { i18next } from "/client/api";


class AvailabilityMap extends React.Component {
  static propTypes = {
    trackingId: PropTypes.string.isRequired
  };

  renderMap() {
    // eslint-disable-next-line no-undef, no-new
    const googleMap = new google.maps.Map(this.refs.map, {
      center: {
        lat: this.props.product.lat,
        lng: this.props.product.lng
      },
      zoom: 13
    });

    // eslint-disable-next-line no-undef, no-new
    new google.maps.Marker({
      position: {
        lat: this.props.product.lat,
        lng: this.props.product.lng
      },
      map: googleMap,
      title: i18next.t("buyHere", "Buy here!")
    });
  }

  componentDidMount() {
    if (this.props.trackingId) {
      if ($("#mapsHead").length === 0) {
        const url = `https://maps.googleapis.com/maps/api/js?key=${this.props.trackingId}`;
        DocHead.loadScript(url, { attrs: { id: "mapsHead" } }, () => {
          this.renderMap();
        });
      } else {
        this.renderMap();
      }
    }
  }

  render() {
    return (
      <div>
        <h3>{i18next.t("availableLocations", "Available at the following stores")}</h3>
        <div className="map" ref="map" />
      </div>
    );
  }
}

export default AvailabilityMap;
