import { useState } from "react";
import axios from "axios";

const CommitGenerator: React.FC = () => {
	const [input, setInput] = useState("");
	const [commitMessage, setCommitMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const generateCommit = async () => {
		setLoading(true);
		setError("");

		const endpoint: any = import.meta.env.VITE_APP_API_ENDPOINT;

		try {
			// Petición al backend
			const response = await axios.post(
				endpoint,
				{
					prompt: input,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setCommitMessage(response.data.commitMessage);
		} catch (err: any) {
			setError(
				err.response?.data?.message || "Error al generar el mensaje de commit"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
			<h1>Generador de Commits</h1>
			<textarea
				placeholder='Describe tu cambio...'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				rows={4}
				style={{ width: "100%", marginBottom: "10px" }}
			/>
			<button
				onClick={generateCommit}
				disabled={loading || !input.trim()}
				style={{
					padding: "10px 20px",
					backgroundColor: loading ? "#ddd" : "#007bff",
					color: "#fff",
					border: "none",
					cursor: loading ? "not-allowed" : "pointer",
				}}>
				{loading ? "Generando..." : "Generar Commit"}
			</button>
			{error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
			{commitMessage && (
				<div
					style={{
						marginTop: "20px",
						padding: "10px",
						backgroundColor: "#f0f0f0",
					}}>
					<strong>Commit generado:</strong>
					<p>{commitMessage}</p>
				</div>
			)}
		</div>
	);
};

export default CommitGenerator;
