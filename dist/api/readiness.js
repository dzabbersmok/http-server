export const handlerReadiness = async (_req, res) => {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });
    res.send("OK");
};
