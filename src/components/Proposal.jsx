import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import AuthContext from "../context/AuthContext";
import { Table, Button } from "react-bootstrap";
import SpeakButton from "./SpeakButton";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/notification";
import axios from "axios";

const Proposal = () => {
  const { words, wordTypes, definitions, proposals, setSelectedWord } =
    useContext(DataContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.notifySuccess) {
      window.location.reload();
      notifySuccess("Word added successfully!");
    }
  }, [location.state]);

  const { isAdmin, isMember } = useContext(AuthContext);
  const member = isMember();
  const admin = isAdmin();

  const navigate = useNavigate();

  const filteredWords = words.filter((item) => {
    const hasProposal = proposals.some(
      (proposal) => proposal.word_id === item.id
    );
    return hasProposal;
  });

  const handleClickWord = (word) => {
    setSelectedWord(word);
    navigate(`/wordDetail?id=${word.id}&word=${word.word}`);
  };

  const handleProposalUpdate = async (proposalId, action) => {
    try {
      const response = await axios.patch(`http://localhost:9999/proposals/${proposalId}`, {
        status: action === 'accept' ? 'accepted' : 'rejected'
      });

      if (response.status === 200) {
        notifySuccess(`Proposal ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error updating proposal:`, error);
      notifyError(`Failed to ${action} the proposal.`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full">
        <div className="flex justify-end mb-2">
          {member && (
            <Button
              variant="light"
              as={Link}
              to="/proposal/add"
              className="mx-2"
            >
              <i className="bi bi-plus-lg"></i> Add Proposal
            </Button>
          )}
        </div>

        {filteredWords.length > 0 ? (
          <Table>
            <tbody>
              {filteredWords.map((item) => {
                const definition = definitions.find(
                  (def) => def.word_id === item.id
                );
                const typeId = definition ? definition.type_id : null;

                const wordType =
                  wordTypes.find((type) => type.id === typeId)?.type ||
                  "unknown";

                const proposal = proposals.find((p) => p.word_id === item.id);

                return (
                  <tr key={item.id}>
                    <td>
                      <strong
                        className="text-[#0D53B0] font-normal hover:cursor-pointer"
                        onClick={() => handleClickWord(item)}
                      >
                        {item.word}
                      </strong>
                      <small className="px-3">{wordType}</small>
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <SpeakButton
                          text={item.word}
                          lang="en-GB"
                          label={<i className="bi bi-volume-up"></i>}
                        />
                        <SpeakButton
                          text={item.word}
                          lang="en-US"
                          label={<i className="bi bi-volume-up"></i>}
                        />
                      </div>
                    </td>
                    <td>{proposal ? proposal.status : "unknown"}</td>
                    {admin && proposal && proposal.status === 'pending' && (
                      <td>
                        <Button variant="light" onClick={() => handleProposalUpdate(proposal.id, 'accept')}>Accept</Button>
                        <Button variant="light" onClick={() => handleProposalUpdate(proposal.id, 'reject')}>Reject</Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No words found</p>
        )}
      </div>
    </div>
  );
};

export default Proposal;
