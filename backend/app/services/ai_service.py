import os
from dotenv import load_dotenv
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone as LangchainPinecone
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import Document
import openai
from ..db import pinecone

# Load environment variables
load_dotenv()

# Initialize OpenAI API key for embeddings
openai.api_key = os.getenv("DEEPSEEK_API_KEY")

# Initialize embeddings model
embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002",
    openai_api_key=os.getenv("DEEPSEEK_API_KEY")
)

# Initialize language model
llm = ChatOpenAI(
    model_name="gpt-3.5-turbo",  # Placeholder for DeepSeek model
    temperature=0.7,
    openai_api_key=os.getenv("DEEPSEEK_API_KEY")
)

# Create a prompt template for the AI tutor
prompt_template = """
You are UstazkAI, a bilingual AI tutor for Arab students in Israel (grades 1-12).
You provide personalized assistance in both Arabic and Hebrew, focusing on official school materials.
You simplify complex topics and adapt your teaching style to the student's needs.

Current student information:
- Grade: {grade}
- Subject: {subject}
- School: {school}

Previous conversation:
{chat_history}

Student's question:
{question}

Please provide a helpful, educational response that is appropriate for the student's grade level.
If the question is in Arabic, respond in Arabic. If the question is in Hebrew, respond in Hebrew.
"""

PROMPT = PromptTemplate(
    input_variables=["grade", "subject", "school", "chat_history", "question"],
    template=prompt_template
)

def get_vectorstore_for_user(user_id):
    """Get or create a vectorstore for a specific user"""
    # Initialize Pinecone vectorstore with LangChain
    vectorstore = LangchainPinecone(
        index=pinecone.index,
        embedding=embeddings,
        text_key="text",
        namespace=user_id  # Use user_id as namespace to separate user data
    )
    return vectorstore

def create_chain_for_user(user_id, grade, subject, school):
    """Create a conversation chain for a specific user"""
    vectorstore = get_vectorstore_for_user(user_id)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
    
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )
    
    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        combine_docs_chain_kwargs={"prompt": PROMPT}
    )
    
    return chain

def get_ai_response(user_id, question, grade, subject, school):
    """Get AI response for a user question"""
    chain = create_chain_for_user(user_id, grade, subject, school)
    
    # Add context variables to the chain
    response = chain({"question": question, "grade": grade, "subject": subject, "school": school})
    
    return response["answer"]

def add_document_to_vectorstore(user_id, text, metadata):
    """Add a document to the user's vectorstore"""
    vectorstore = get_vectorstore_for_user(user_id)
    
    # Create a Document object
    doc = Document(
        page_content=text,
        metadata=metadata
    )
    
    # Add the document to the vectorstore
    vectorstore.add_documents([doc])
    
    return True

def generate_embedding(text):
    """Generate an embedding for a text"""
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response["data"][0]["embedding"]