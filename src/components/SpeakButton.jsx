import PropTypes from "prop-types";

const SpeakButton = ({ text, lang, label }) => {
  const speakText = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    synth.speak(utterance);
  };

  return (
    <button
      onClick={speakText}
      className="flex items-center p-2 mx-2 rounded-full transition-colors duration-300 text-white"
      style={{ backgroundColor: lang === "en-GB" ? "#07255E" : "#8F0610" }}
    >
      {label}
    </button>
  );
};

SpeakButton.propTypes = {
  text: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired,
};

export default SpeakButton;
